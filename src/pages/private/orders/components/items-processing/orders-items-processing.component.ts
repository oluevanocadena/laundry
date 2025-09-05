import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersItemsDomain } from '@bussiness/orders/domains/orders.items.domain';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { HelperPage } from '@components/common/helper.page';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: 'orders-items-processing',
  standalone: false,
  templateUrl: './orders-items-processing.component.html',
  styleUrls: ['./orders-items-processing.component.scss'],
})
export class OrdersItemsProcessingComponent
  extends HelperPage
  implements OnInit
{
  utils = UtilsDomain;
  itemsDomain = OrdersItemsDomain;

  //Flags
  showProcessItem: boolean = false;

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */
  confirm() {}

  processAllItems() {
    this.showProcessItem = true;
    this.facade.orderItemSelected.value = null;
  }

  processItem(item: OrderItem) {
    this.facade.orderItemSelected.value = item;
    this.showProcessItem = true;
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  ngOnInit() {}
}
