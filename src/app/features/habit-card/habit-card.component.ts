import { Component } from "@angular/core";
import { HabitService } from "../../core/services/habit.service";
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger, keyframes } from "@angular/animations";
import { StreakHighlightDirective } from "../../shared/directives/streak-glow.directive";

@Component({
    selector:'app-habit',
    standalone:true,
    imports:[CommonModule, StreakHighlightDirective],
    templateUrl:'./habit-card.component.html',
    styleUrls:['./habit-card.component.css'],
    animations: [
    trigger('habitState', [
      state('active', style({ transform: 'translateX(0)', opacity: 1 })),
      state('completed', style({ transform: 'translateX(40px)', opacity: 0.5 })),
      transition('active => completed', [
        animate('0.4s ease', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.3)', offset: 0.4 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
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

    selectCategory(cat:string){
        this.habitService.selectedCategory=cat;
    }   
}