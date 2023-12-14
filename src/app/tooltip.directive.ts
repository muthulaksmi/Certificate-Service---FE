// tooltip.directive.ts
import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private createTooltipElement(): void {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('div');
      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.appTooltip));
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.createTooltipElement();

    if (this.tooltipElement) {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 5;
      const left = rect.left + window.scrollX + rect.width / 2;

      this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
      this.renderer.setStyle(this.tooltipElement, 'opacity', '1');

      // Append the tooltip to the host element's parent instead of document.body
      this.renderer.appendChild(this.el.nativeElement.parentNode, this.tooltipElement);
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    }
  }
}
