import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[padding], [width], [minWidth], [height], [minHeight] [scroll]', // Selector para los atributos
})
export class StyleDirective implements OnChanges {
  @Input() padding?: string;
  @Input() width?: string;
  @Input() minWidth?: string;
  @Input() minHeight?: string;
  @Input() height?: string;
  @Input() scroll?: 'x' | 'y';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['padding']) {
      this.renderer.setStyle(this.el.nativeElement, 'padding', this.padding);
    }
    if (changes['width']) {
      this.renderer.setStyle(this.el.nativeElement, 'width', this.width);
    }
    if (changes['minWidth']) {
      this.renderer.setStyle(this.el.nativeElement, 'minWidth', this.minWidth);
    }
    if (changes['minHeight']) {
      this.renderer.setStyle(this.el.nativeElement, 'minHeight', this.minHeight);
    }
    if (changes['height']) {
      this.renderer.setStyle(this.el.nativeElement, 'height', this.height);
    }
    if (changes['scroll']) {
      const overflow = this.scroll === 'x' ? 'auto hidden' : 'hidden auto';
      this.renderer.setStyle(this.el.nativeElement, 'overflow', overflow);
    }
  }
}