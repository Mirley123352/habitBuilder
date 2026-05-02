import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector:'[appStreakHighlight]'
})
export class streakHighlightDirective {
    @Input() set appStreakHightlight(streak:number){
        this.isActive=streak>5;
    }
    isActive=false;
    // constructor(private el:ElementRef, private renderer: Renderer2){}

    // ngOnChanges(){
    //     // if(this.streak>5){
    //     //     this.renderer.setStyle(this.el.nativeElement,'boxShadow','0 0 15px #ffff')
    //     // }
    // }
    
}