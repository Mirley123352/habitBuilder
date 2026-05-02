import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector:'[appStreakHighlight]'
})
export class streakHighlightDirective {
    @Input() set appStreakHightlight(streak:number){
        this.isActive=streak>5;
    }
    isActive=false;
    
}