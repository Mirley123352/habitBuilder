import { Injectable, signal } from "@angular/core";
import { Habit } from "../models/habit.model";
import { StorageService } from "./storage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HabitService {

  private habitsSignal = signal<Habit[]>([]);

  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  habits$ = this.habitsSubject.asObservable();

  constructor(private storage: StorageService) {
    // ← load from storage into BOTH on startup
    const initial = this.storage.getHabits();
    this.habitsSignal.set(initial);
    this.habitsSubject.next(initial);
  }

  selectedCategory: string = 'All';

  // ← refresh BOTH signal and subject together
  private refresh(): void {
    const habits = this.storage.getHabits();
    this.habitsSignal.set(habits);
    this.habitsSubject.next(habits);  // ← this is what header listens to
  }

  getHabits(): Habit[] {
    return this.habitsSignal();
  }

  getHabitsBySelectedCategory(): Habit[] {
    if (this.selectedCategory === 'All') {
      return this.getHabits();
    }
    return this.getHabits().filter(
      habit => habit.category === this.selectedCategory
    );
  }

  addHabit(habit: Habit): void {
    const habits = this.storage.getHabits();
    habits.unshift(habit);
    this.storage.setHabits(habits);
    this.refresh();
  }

  deleteHabit(habitId: number): void {
    this.storage.deleteHabit(habitId);
    this.refresh();
  }

  completeHabit(habit:Habit){
        
        const today=new Date().toISOString().split('T')[0];
        if(!habit.completedDates.includes(today)){
            habit.completedDates.push(today);
            habit.streak++;

        }
        else{
            habit.completedDates=habit.completedDates.filter(d=>d!==today);
            habit.streak = this.calculateStreak(habit); // ← replace habit.streak--
            this.storage.setHabits(this.getHabits());
        }
        const currentHabits = this.habitsSignal();

        this.storage.setHabits(currentHabits);

        this.habitsSignal.set([...currentHabits]);
        this.refresh();
      }

  toggleToday(habitId: number): void {
    const habits = this.storage.getHabits();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const today = new Date().toISOString().split('T')[0];
    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today);
      habit.streak++;
    } else {
      habit.completedDates = habit.completedDates.filter(d => d !== today);
      habit.streak = this.calculateStreak(habit);
    }

    this.storage.setHabits(habits);
    this.refresh();   // ← header gets updated here
  }

  getWeeklyProgress(habitId: number): number {
    const habit = this.getHabits().find(h => h.id === habitId);
    if (!habit) return 0;
    const startOfWeek = this.getStartOfWeek(new Date());
    const done = habit.completedDates.filter(
      d => new Date(d) >= startOfWeek
    ).length;
    const daysSoFar = new Date().getDay() + 1;
    return Math.min((done / daysSoFar) * 100, 100);
  }

  getOverallWeeklyProgress(): number {
    const habits = this.getHabits();
    if (habits.length === 0) return 0;

    const startOfWeek = this.getStartOfWeek(new Date());
    const daysSoFar = new Date().getDay() + 1;
    const maxPossible = habits.length * daysSoFar;

    let totalDone = 0;
    habits.forEach(habit => {
      totalDone += habit.completedDates.filter(
        d => new Date(d) >= startOfWeek
      ).length;
    });

    return maxPossible ? Math.min((totalDone / maxPossible) * 100, 100) : 0;
  }

  getMaxStreak(): number {
    const habits = this.getHabits();
    if (habits.length === 0) return 0;
    return Math.max(...habits.map(h => h.streak));
  }

  isCompleted(habit: Habit): boolean {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today);
  }

  getCompletedDates(): Set<string> {
    const dates = new Set<string>();
    this.getHabits().forEach(habit => {
      habit.completedDates.forEach(date => dates.add(date));
    });
    return dates;
  }

  setCategory(value: string): void {
    this.selectedCategory = value;
  }

  private getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private calculateStreak(habit: Habit): number {
    if (habit.completedDates.length === 0) return 0;

    const sorted = [...habit.completedDates].sort().reverse();
    let streak = 0;
    let check = new Date();
    check.setHours(0, 0, 0, 0);

    for (const dateStr of sorted) {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);

      const diffDays = Math.round(
        (check.getTime() - d.getTime()) / 86400000
      );

      if (diffDays === 0 || diffDays === 1) {
        streak++;
        check = d;
      } else {
        break;
      }
    }
    return streak;
  }
}