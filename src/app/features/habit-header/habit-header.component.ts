import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../core/services/habit.service';
import { trigger, style, animate, transition } from '@angular/animations';
interface Category {
  value: string;
  label: string;
  icon: string;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-header.component.html',
  styleUrls: ['./habit-header.component.css'],
  animations: [
    trigger('progressAnim', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('600ms ease-out', style({ width: '*' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  today = new Date();
  overallStreak = 0;
  progressPct = 0;
  activeCategory = 'all';
  categories: Category[] = [
    { value: 'all',      label: 'All',      icon: '✨' },
    { value: 'health',   label: 'Health',   icon: '💪' },
    { value: 'work',     label: 'Work',     icon: '🎯' },
    { value: 'personal', label: 'Personal', icon: '🌱' },
  ];
  constructor(private habitService: HabitService) {}
  ngOnInit(): void {
    this.loadStats();
  }
  loadStats() {
    this.overallStreak = this.habitService.getMaxStreak();
    this.progressPct = this.habitService.getOverallWeeklyProgress();
  }
  setCategory(value: string): void {
    this.activeCategory = value;
    this.habitService.setCategory(value);
  }
}