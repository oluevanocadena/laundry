import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'customers-create-modal',
  standalone: false,
  templateUrl: './customers-create-modal.component.html',
  styleUrls: ['./customers-create-modal.component.scss'],
})
export class CustomersCreateModalComponent extends HelperPage implements OnInit {
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();

  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  onConfirm() {
    this.facade.submitForm();
  }

  /**
   * Getters
   */
  get canSave(): boolean {
    return this.facade.formGroup.valid;
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
