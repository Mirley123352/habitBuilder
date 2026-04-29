import { Component } from "@angular/core";
import { HabitService } from "../../core/services/habit.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'app-add-habit',
    standalone:true,
    imports:[FormsModule],
    templateUrl:'./add.habit.component.html'
})
export class AddHabitComponent{
    name='';
    category:any='Health';
    selectedIcon='🔨';

    icons=['📚','🤸‍♀️','⭐','🛌','🔨'];
    
    constructor(private habitService:HabitService){

    }
    addHabit(){
        this.habitService.addHabit({
            id:Date.now(),
            name:this.name,
            icon:this.selectedIcon,
            category:this.category,
            streak:0,
            completedDates:[],
            weeklyGoal:5
        });
        this.name='';
        this.selectedIcon='🔨';
    }
}