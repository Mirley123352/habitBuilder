import { Routes } from '@angular/router';
import { HabitCardComponent } from './features/habit-card/habit-card.component';
import { AddHabitComponent } from './features/habit-toggle/add-habit.component';

export const routes: Routes = [
  { path: '', component: HabitCardComponent },
  { path: 'add', component: AddHabitComponent },
];