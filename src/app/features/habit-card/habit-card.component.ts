import { Component, Input } from "@angular/core";
import { Habit } from "../../core/models/habit.model";
import { HabitService } from "../../core/services/habit.service";
import { CommonModule } from "@angular/common";

@Component({
    selector:'app-habit-card',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./habit-card.component.html',
    styleUrls:['./habit-card.component.css']
})
export class HabitCardComponent{
    @Input()habit!:Habit;

    constructor(private habitService:HabitService){

    }
    
    complete(){
        this.habitService.completeHabit(this.habit);
    }
}