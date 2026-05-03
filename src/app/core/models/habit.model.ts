export interface Habit {
    id:number;
    name:string;
    streak:number;
    category:string;
    icon:string;
    weeklyGoal:number;
    completedDates:string[];
}