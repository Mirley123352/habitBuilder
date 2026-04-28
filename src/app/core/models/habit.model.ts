export interface Habit {
    id:number;
    name:string;
    streak:number;
    category:'Health'|'Work'|'Personal';
    icon:string;
    weeklyGoal:number;
    completedDates:string[];
}