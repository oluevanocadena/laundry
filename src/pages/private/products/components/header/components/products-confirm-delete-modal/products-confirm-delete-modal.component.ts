import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'products-confirm-delete-modal',
  standalone: false,
  templateUrl: './products-confirm-delete-modal.component.html',
  styleUrls: ['./products-confirm-delete-modal.component.scss'],
})
export class ProductsConfirmDeleteModalComponent implements OnInit {
  private _show = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
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
