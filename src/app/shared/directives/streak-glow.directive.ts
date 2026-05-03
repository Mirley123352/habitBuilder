import { Directive, Input, HostBinding } from "@angular/core";

@Directive({
  selector: '[appStreakHighlight]',
  standalone: true
})
export class StreakHighlightDirective {
  @Input('appStreakHighlight') streak: number = 0;

  @HostBinding('style.backgroundColor') get bgColor() {
    if (this.streak > 0 && this.streak <= 5) return '#1d744bc2';
    if (this.streak > 5) return '#fff9c4';
    return 'white';
  }

  @HostBinding('style.border') get border() {
    return this.streak > 5 ? '3px solid #FFD700' : '1px solid #ddd';
  }

  @HostBinding('style.box-shadow') get glow() {
    return this.streak > 5 ? '0 0 15px rgba(255, 215, 0, 0.7)' : 'none';
  }
}