import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './shared/components/calendar-view/calendar-view.component';
import { HabitCardComponent } from './features/habit-card/habit-card.component';
import { AddHabitComponent } from './features/habit-toggle/add-habit.component';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, AddHabitComponent, NgIf, HabitCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isModalOpen=false;
  toggleModal(){
    this.isModalOpen=!this.isModalOpen;
  }
  title = 'habit';
}
