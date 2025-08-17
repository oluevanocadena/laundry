import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'customers-confirm-disable-modal',
  standalone: false,
  templateUrl: './customers-confirm-disable-modal.component.html',
  styleUrls: ['./customers-confirm-disable-modal.component.scss'],
})
export class CustomersConfirmDisableModalComponent implements OnInit {
  private _show = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }

  @Input() disabled: boolean = false;

  @Output() showChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<void>();

  constructor() {}

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(false);
  }

  confirm() {
    this.onConfirm.emit();
  }

  ngOnInit() {}
}
