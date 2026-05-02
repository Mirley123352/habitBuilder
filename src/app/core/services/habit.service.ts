import { Injectable ,signal,computed} from "@angular/core";
import { Habit } from "../models/habit.model";
import { StorageService } from "./storage.service";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class HabitService{
    private habitsSignal = signal<Habit[]>([]);
    
    
  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  habits$ = this.habitsSubject.asObservable();

  constructor(private storage: StorageService) {
    this.habitsSubject.next(this.storage.getHabits());
  }
    selectedCategory:string='All';

    private refresh() {
    this.habitsSignal.set(this.storage.getHabits());
    }

    getHabits():Habit[]{
        return this.habitsSignal();
    }

    getHabitsBySelectedCategory(){
        if(this.selectedCategory==='All'){
            return this.getHabits();
        }
        return this.getHabits().filter(
            habit=>habit.category===this.selectedCategory
        );
        
    }

    addHabit(habit:Habit){
        const habits=this.getHabits();
        habits.unshift(habit);
        this.storage.setHabits(habits);
        this.refresh();
    }

    deleteHabit(habitId:number):void{
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

    toggleToday(habitId:number){
        const habit=this.getHabits().find(h=>h.id===habitId);
        if(!habit)return ;
        
        const today=new Date().toISOString().split('T')[0];
        if(!habit.completedDates.includes(today)){
            habit.completedDates.push(today);
            habit.streak++;
            this.storage.setHabits(this.getHabits());
        }
        else{
            habit.completedDates=habit.completedDates.filter(d=>d!==today);
            habit.streak = this.calculateStreak(habit); // ← replace habit.streak--
        this.storage.setHabits(this.getHabits());
        }
        this.storage.setHabits(this.getHabits());
        this.refresh();
    }

    getWeeklyProgress(habitId:number):number{
        const habit=this.getHabits().find(h=>h.id===habitId);
        if(!habit)return 0;
        const startOfWeek=this.getStartOfWeek(new Date());
        const done=habit.completedDates.filter(d=>new Date(d)>=startOfWeek).length;
        return Math.min((done/habit.weeklyGoal)*100,100);
    }

    private getStartOfWeek(date:Date):Date{
        const d=new Date(date);
        const day=d.getDay();
        d.setDate(d.getDate()-day);
        return d;
    }

    isCompleted(habit: Habit):boolean{
        const today=new Date().toISOString().split('T')[0];
        return habit.completedDates.includes(today);
    }
    getCompletedDates():Set<string>{
        const dates=new Set<string>();

        this.getHabits().forEach(habit=>{
            habit.completedDates.forEach(date=>dates.add(date));
        });
        return dates;
    }
    getOverallWeeklyProgress(): number {
    const habits = this.getHabits();
    if (habits.length === 0) return 0;

    const startOfWeek = this.getStartOfWeek(new Date());

    let totalDone = 0;
    let totalGoal = 0;

    habits.forEach(habit => {
        const done = habit.completedDates.filter(
            d => new Date(d) >= startOfWeek
        ).length;

        totalDone += done;
        totalGoal += habit.weeklyGoal;
    });

    return totalGoal ? Math.min((totalDone / totalGoal) * 100, 100) : 0;
}
getMaxStreak(): number {
    const habits = this.getHabits();

    if (habits.length === 0) return 0;

    return Math.max(...habits.map(h => h.streak));
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

            const diffDays = Math.round((check.getTime() - d.getTime()) / 86400000);

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
