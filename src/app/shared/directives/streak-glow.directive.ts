import { Directive, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStreakGlow]',
  standalone: true
})
export class StreakGlowDirective implements OnChanges {

  @Input('appStreakGlow') streak: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.streak > 5) {
      this.applyGlow();
    } else {
      this.removeGlow();
    }
  }

  private applyGlow(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #6c63ff');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 12px rgba(108, 99, 255, 0.6), 0 0 24px rgba(108, 99, 255, 0.3)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease, border 0.3s ease');
  }

  private removeGlow(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'border');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}