import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";

@Injectable({providedIn:'root'})
export class StorageService{
    private storageKey ='habits';
    private habits:Habit[];

    constructor(){
        this.habits=this.loadFromStorage();
    }

    getHabits():Habit[]{
        return this.habits;
    }

    setHabits(habits:Habit[]):void{
        this.habits=habits;
        this.saveToStorage();
    }

    private saveToStorage():void{
        localStorage.setItem(this.storageKey,JSON.stringify(this.habits));
    }

    private loadFromStorage():Habit[]{
        const data=localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data):[];
    }
}