import { Component } from "@angular/core";
import { HabitService } from "../../core/services/habit.service";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgForOf } from "@angular/common";

@Component({
    selector:'app-add-habit',
    standalone:true,
    imports: [FormsModule, NgForOf, CommonModule],
    templateUrl:'./add-habit.component.html',
    styleUrls:['./add-habit.component.css']
})
export class AddHabitComponent{
    name='';
    category:any='Health';
    selectedIcon='🔨';
    errorMessage='';

    icons=['🔨','📚','🤸‍♀️','⭐','🛌'];
    
    constructor(private habitService:HabitService){

    }
    addHabit(){
        const trimmedname=this.name.trim();
        if(!trimmedname){
            return;
        }
        if((!this.habitService.selectedCategory||this.habitService.selectedCategory==='All')){
            this.errorMessage='Please select a category first (not "All").';
            return;
        }
        this.habitService.addHabit({
            id:Date.now(),
            name:this.name,
            icon:this.selectedIcon,
            category:this.habitService.selectedCategory,
            streak:0,
            completedDates:[],
            weeklyGoal:5
        });
        this.name='';
        this.selectedIcon='🔨';
    }
}