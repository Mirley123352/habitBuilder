import { Injectable ,signal,computed} from "@angular/core";
import { Habit } from "../models/habit.model";
import { StorageService } from "./storage.service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class HabitService{
    private habitsSignal = signal<Habit[]>([]);
    private habitsSubject = new BehaviorSubject<Habit[]>([]);
    habits$: Observable<Habit[]> = this.habitsSubject.asObservable();
    
    constructor(private storage: StorageService) {
        const habits = this.storage.getHabits();
        this.habitsSignal.set(habits);
        this.habitsSubject.next(habits);
    }
    selectedCategory:string='All';

    private refresh() {
        const habits = this.storage.getHabits();
        this.habitsSignal.set(habits);
        this.habitsSubject.next(habits);
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
            habit.streak = Math.max(0, habit.streak - 1);
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

    getMaxStreak(): number {
        const habits = this.getHabits();
        if (habits.length === 0) return 0;
        return Math.max(...habits.map(h => h.streak));
    }

    getOverall7DayProgress(): number {
        const habits = this.getHabits();
        if (habits.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        let completed = 0;

        habits.forEach(habit => {
            completed += habit.completedDates.filter(dateStr => {
            const d = new Date(dateStr);
            d.setHours(0, 0, 0, 0);
            return d >= sevenDaysAgo && d <= today;
        }).length;
    });

    const maxPossible = habits.length * 7;

    return Math.round((completed / maxPossible) * 100);
}
}