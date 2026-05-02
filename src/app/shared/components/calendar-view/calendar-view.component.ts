import { Component, OnInit ,computed} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarService } from "../../../core/services/calendar.service";
import { HabitService } from "../../../core/services/habit.service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarComponent {

  calendarCells = computed(() => {
    return this.calendarService.getMonthlyCalendar(new Date());
  });
  monthName!: string;
  year!: number;

  constructor(private calendarService: CalendarService ,private habitService: HabitService) {
    const today = new Date();
    this.monthName = today.toLocaleDateString('default', { month: 'long' });
    this.year = today.getFullYear();
  }

}