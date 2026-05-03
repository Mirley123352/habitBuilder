import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStreakGlow]',
  standalone: true
})
export class StreakGlowDirective implements OnChanges {

  @Input('appStreakGlow') streak: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['streak']) {
      this.applyGlow(this.streak);
    }
  }

  private applyGlow(streak: number): void {
    const el = this.el.nativeElement;

    // always remove both first
    this.renderer.removeClass(el, 'glow-active');
    this.renderer.removeClass(el, 'glow-inactive');

    // then add the correct one
    if (streak > 5) {
      this.renderer.addClass(el, 'glow-active');
    } else {
      this.renderer.addClass(el, 'glow-inactive');
    }

    // debug — open F12 console to verify
    console.log(`Streak: ${streak} → class: ${streak > 5 ? 'glow-active' : 'glow-inactive'}`);
  }
}