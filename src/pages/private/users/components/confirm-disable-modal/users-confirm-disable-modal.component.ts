import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'users-confirm-disable-modal',
  standalone: false,
  templateUrl: './users-confirm-disable-modal.component.html',
  styleUrls: ['./users-confirm-disable-modal.component.scss'],
})
export class UsersConfirmDisableModalComponent implements OnInit {
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
