import { Component, OnInit } from "@angular/core";
import { CalendarCell } from "../../../core/models/calendarcell.model";
import { CommonModule } from "@angular/common";
import { HabitService } from "../../../core/services/habit.service";

@Component({
    selector:'app-calendar',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./calendar-view.component.html',
    styleUrls:['./calendar-view.component.css']
})
export class CalendarComponent implements OnInit{
    monthName!:string;
    year!:number;
    calendarCells:CalendarCell[]=[];
    completedDates=new Set<string>();

    constructor(private habitService:HabitService){
        this.completedDates=this.habitService.getCompletedDates();
    }

    ngOnInit(): void {
        this.buildCalendar();
    }

    isCompleted(date:Date|null):boolean{
        if(!date){
            return false;
        }
        const key=this.toLocalDateKey(date);
        return this.completedDates.has(key);
    }

    private toLocalDateKey(date:Date):string{
        const year=date.getFullYear();
        const month=(date.getMonth()+1).toString().padStart(2,'0');
        const day=date.getDate().toString().padStart(2,'0');

        return `${year}-${month}-${day}`;
    }

    buildCalendar():void{
        const today=new Date();
        const month=today.getMonth();
        this.year=today.getFullYear();
        this.monthName=today.toLocaleDateString('default',{month:'long'});
        const firstDay= new Date(this.year,month,1);
        const lastDay= new Date(this.year,month+1,0);

        let startindex=firstDay.getDay()-1;
        if(startindex<0)startindex=6;

        this.calendarCells=[];

        for(let i=0;i<startindex;i++){
            this.calendarCells.push({date:null});
        }

        for(let day=1;day<=lastDay.getDate();day++){
            const date=new Date(this.year,month,day);
            this.calendarCells.push({
                date,
                dayNumber:day,
                isToday:this.isToday(date),
            });
        }
    }

    isToday(date:Date):boolean{
        const today=new Date();
        return(
            date.getDate()===today.getDate()&&
            date.getMonth()===today.getMonth()&&
            date.getFullYear()===today.getFullYear()
        );
    }
}