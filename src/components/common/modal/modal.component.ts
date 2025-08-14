import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends HelperPage {
  @ViewChild('buttonConfirm') buttonConfirm!: ElementRef;

  private _show = false;
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
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  @Input() closeLabel = 'Cancelar';
  @Input() confirmLabel = 'Confirmar';
  @Input() confirmStyle: ModalConfirmStyleButton = 'danger';
  @Input() centered: boolean = true;

  private nativeButton: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
  }

  /**
   * UI Events
   */
  close() {
    this.show = false;
    this.showChange.emit(this.show);
    this.onClose.emit();
  }

  confirm() {
    this.close();
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
}

export type ModalConfirmStyleButton =
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
