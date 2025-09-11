import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  HostListener,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UITableColumn } from '@globals/interfaces/ui.interfaces';

@Directive({
  standalone: false,
  selector: '[padding], [margin], [width], [minWidth], [height], [minHeight], [maxHeight], [maxWidth], [scroll]', // Selector para los atributos
})
export class StyleDirective implements OnChanges {
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() width?: string;
  @Input() minWidth?: string;
  @Input() minHeight?: string;
  @Input() maxHeight?: string;
  @Input() height?: string;
  @Input() maxWidth?: string;
  @Input() scroll?: 'x' | 'y';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['padding']) {
      this.renderer.setStyle(this.el.nativeElement, 'padding', this.padding);
    }
    if (changes['margin']) {
      this.renderer.setStyle(this.el.nativeElement, 'margin', this.margin);
    }
    if (changes['width']) {
      this.renderer.setStyle(this.el.nativeElement, 'width', this.width);
    }
    if (changes['minWidth']) {
      this.renderer.setStyle(this.el.nativeElement, 'minWidth', this.minWidth);
    }
    if (changes['maxWidth']) {
      this.renderer.setStyle(this.el.nativeElement, 'maxWidth', this.maxWidth);
    }
    if (changes['minHeight']) {
      this.renderer.setStyle(this.el.nativeElement, 'minHeight', this.minHeight);
    }
    if (changes['maxHeight']) {
      this.renderer.setStyle(this.el.nativeElement, 'maxHeight', this.maxHeight);
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

@Directive({
  standalone: false,
  selector: '[showLoader]',
})
export class ShowLoaderDirective implements OnChanges {
  @Input('showLoader') isLoading: boolean | null = false;

  private originalContent: string | null = null;
  private loaderEl: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading']) {
      this.toggleLoader(this.isLoading ?? false);
    }
  }

  private toggleLoader(show: boolean): void {
    const element = this.el.nativeElement;

    if (show) {
      if (!this.originalContent) {
        this.originalContent = element.innerHTML;
      }

      // Crea el loader
      this.loaderEl = this.renderer.createElement('span');
      this.renderer.addClass(this.loaderEl, 'loader');
      this.renderer.setStyle(this.loaderEl, 'vertical-align', 'middle');

      this.renderer.setProperty(element, 'innerHTML', '');
      this.renderer.appendChild(element, this.loaderEl);
    } else {
      if (this.originalContent !== null) {
        this.renderer.setProperty(element, 'innerHTML', this.originalContent);
        this.originalContent = null;
      }
    }
  }
}

@Directive({
  selector: '[ifColumn]',
  standalone: false,
})
export class IfColumnDirective {
  @Input('ifColumn') set config(value: { columns: UITableColumn[]; key: string }) {
    this.viewContainer.clear(); 
    if (!value?.columns || !value?.key) return;

    const col = value.columns.find((c) => c.key === value.key);
    if (col?.selected) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
