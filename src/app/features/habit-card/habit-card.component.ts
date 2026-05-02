import { Component, Input } from "@angular/core";
import { HabitService } from "../../core/services/habit.service";
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector:'app-habit',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./habit-card.component.html',
    styleUrls:['./habit-card.component.css'],
})
export class HabitCardComponent{
    constructor(public habitService:HabitService){}

    categories=['All','Health','Work','Personal'];
    get filteredHabits(){
        return this.habitService.getHabitsBySelectedCategory();
    }

    toggleComplete(habitId:number){
        this.habitService.toggleToday(habitId);
    }

    // progress(habitId:number){
    //     return this.habitService.getWeeklyProgress(habitId);
    // }
    
    selectCategory(cat:string){
        this.habitService.selectedCategory=cat;
    }   
}