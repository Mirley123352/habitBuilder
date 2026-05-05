import { Injectable } from '@angular/core';
import { HabitService } from './habit.service';
import { CalendarCell } from '../models/calendarcell.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private habitService: HabitService) {}

  getMonthlyCalendar(viewDate: Date): CalendarCell[] {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const completedDates = this.habitService.getCompletedDates();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startIndex = firstDay.getDay() - 1;
    if (startIndex < 0) startIndex = 6;

    const cells: CalendarCell[] = [];

    for (let i = 0; i < startIndex; i++) {
      cells.push({ date: null });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      cells.push({
        date,
        dayNumber: day,
        isToday: this.isToday(date),
        isCompleted: completedDates.has(this.toLocalDateKey(date))
      });
    }

    return cells;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private toLocalDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}