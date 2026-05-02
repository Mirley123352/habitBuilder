import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Habit } from "../models/habit.model";
import { isPlatformBrowser } from "@angular/common";

@Injectable({providedIn:'root'})
export class StorageService{
    private storageKey ='habits';
    private habits:Habit[];

    constructor(@Inject(PLATFORM_ID) private platformId:Object){
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
        if(isPlatformBrowser(this.platformId)){
          localStorage.setItem(this.storageKey,JSON.stringify(this.habits));
        }
    }

    private loadFromStorage():Habit[]{
        if(isPlatformBrowser(this.platformId)){
          const data=localStorage.getItem(this.storageKey);
          return data ? JSON.parse(data):[];
        }
        return [];
    }
}