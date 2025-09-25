import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalConfirmStyleButton } from '@components/common/modal/modal.component';

@Component({
  selector: 'modal-confirm',
  standalone: false,
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  private _show = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  @Input() confirmLabel = 'Confirmar';

  @Input() confirmStyle: ModalConfirmStyleButton = 'danger';

  constructor() {}

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(false);
    this.onClose.emit();
  }

  confirm() {
    this.close();
    this.onConfirm.emit();
  }

  /**
   * Lifecycle
   */
  ngOnInit() {}
}
