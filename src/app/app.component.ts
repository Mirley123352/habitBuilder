import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { CalendarComponent } from './shared/components/calendar-view/calendar-view.component';
import { HabitCardComponent } from './features/habit-card/habit-card.component';
import { AddHabitComponent } from './features/habit-toggle/add-habit.component';
import { NgIf } from "@angular/common";
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CalendarComponent, AddHabitComponent, NgIf, HabitCardComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isModalOpen = false;
  title = 'habit';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isModalOpen = event.url === '/add';
      }
    });
  }

  toggleModal() {
    if (this.isModalOpen) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/add']);
    }
  }
}