import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersItemsDomain } from '@bussiness/orders/domains/orders.items.domain';
import { OrderItem } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';
import { FormProp } from '@globals/types/form.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: "orders-adjust-delivery-tracking",
  standalone: false,
  templateUrl: "./orders-adjust-delivery-tracking.component.html",
  styleUrls: ["./orders-adjust-delivery-tracking.component.scss"]
})

export class OrdersAdjustDeliveryTrackingComponent extends HelperPage
implements OnInit
{
//Flags
showConfirm: boolean = false;

utils = UtilsDomain;
itemsDomain = OrdersItemsDomain;

//Show
private _show: boolean = false;
@Input() set show(value: boolean) {
  this._show = value;
  if (value) {
    this.formGroup.reset();
    this.formGroup.patchValue({
      deliveryTrackingNumber:
        this.facade.selectedOrder.value?.DeliveryTrackingNumber ?? '',
      deliveryTransportCompany:
        this.facade.selectedOrder.value?.DeliveryTransportCompany ?? '',
      notifyDelivery:
        this.facade.selectedOrder.value?.NotifyDelivery ?? false,
    });
  }
}
get show() {
  return this._show;
}
@Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

//formGroup
formGroup = new FormGroup({
  deliveryTrackingNumber: new FormControl<string>(''),
  deliveryTransportCompany: new FormControl<string>(''),
  notifyDelivery: new FormControl<boolean>(false),
});

notifyDelivery = new FormProp<boolean>(
  this.formGroup,
  'notifyDelivery',
  false
);

constructor(public facade: OrdersDraftFacade) {
  super();
}

/**
 * UI Events
 */
confirm() {
  this.facade.onSelectDelivery();
} 

close() {
  this.show = false;
  this.showChange.emit(this.show);
}


ngOnInit() {}
}
