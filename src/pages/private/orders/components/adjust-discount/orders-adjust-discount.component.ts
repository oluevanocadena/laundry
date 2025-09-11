import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-adjust-discount',
  standalone: false,
  templateUrl: './orders-adjust-discount.component.html',
  styleUrls: ['./orders-adjust-discount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersAdjustDiscountComponent extends HelperPage {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public facade: OrdersDraftFacade, public nzmessage: NzMessageService, public cdr: ChangeDetectorRef) {
    super();
  }

  /**
   * Ui Events
   */

  applyDiscount() {
    this.facade.onApplyDiscount();
    this.close();
  }

  resetAmount() {
    this.facade.discount.value = 0;
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Getters
   */
  get discountType() {
    return this.facade.discountType.value;
  }

  get placeholder() {
    return this.discountType === 'amount' ? 'Monto' : 'Porcentaje';
  }

  get maxNumber() {
    return this.discountType === 'amount' ? this.facade.orderTotals.value?.Total ?? 99999 : 100;
  }

  get stepIncrement() {
    return this.discountType === 'amount' ? 1.0 : 1;
  }

  get postFixText() {
    return this.discountType === 'amount' ? 'dollar-sign' : 'percent';
  }

  get canSave() {
    return this.facade.discount.value ?? 0 > 0;
  }

  get buttonLabel() {
    return this.discountType === 'amount' ? 'Aplicar monto' : 'Aplicar porcentaje';
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.facade.api.busy.onChange((value) => {
      this.cdr.detectChanges();
    }); 
  }
}
