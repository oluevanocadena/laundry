import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'drawer',
  standalone: false,
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild('buttonConfirm') buttonConfirm!: ElementRef;

  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      setTimeout(() => {
        this.setConfirmStyle();
      });
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() closeLabel = 'Cancelar';
  @Input() confirmLabel = 'Confirmar';
  @Input() confirmStyle: DrawerConfirmStyleButton = 'danger';
  @Input() large: string = '500px';
  @Input() closable: boolean = true;

  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
    this.onClose.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }

  /**
   * Methods
   */

  setConfirmStyle() {
    if (this.confirmStyle && this.buttonConfirm.nativeElement) {
      BUTTON_STYLES.forEach((style) => {
        this.renderer.removeAttribute(this.buttonConfirm.nativeElement, style);
      });
      this.renderer.setAttribute(
        this.buttonConfirm.nativeElement,
        this.confirmStyle,
        ''
      );
    }
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}

export type DrawerConfirmStyleButton =
  | 'danger'
  | 'primary'
  | 'warning'
  | 'success'
  | 'info';

export const BUTTON_STYLES = [
  'danger',
  'primary',
  'warning',
  'success',
  'info',
] as const;
