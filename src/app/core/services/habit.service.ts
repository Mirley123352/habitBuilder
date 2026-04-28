import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import { StorageService } from "./storage.service";

@Injectable({providedIn:'root'})
export class HabitService{
    
    constructor(private storage:StorageService){

    }

    getHabits():Habit[]{
        return this.storage.getHabits();
    }

    addHabit(habit:Habit){
        const habits=this.getHabits();
        habits.push(habit);
        this.storage.setHabits(habits);
    }

    completeHabit(habit:Habit){
        const today=new Date().toISOString().split('T')[0];
        if(!habit.completedDates.includes(today)){
            habit.completedDates.push(today);
            habit.streak++;
            this.storage.setHabits(this.getHabits());
        }
    }
}