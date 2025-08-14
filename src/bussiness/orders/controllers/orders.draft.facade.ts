import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FacadeBase } from '../../../types/facade.base';
import { SubjectProp } from '../../../types/subject.type';
import { OrdersApiService } from '../orders.api.service';
import { Order } from '../orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersDraftFacade extends FacadeBase {
  edition: boolean = false;
  showDeleteModal: boolean = false;
  showRefundModal: boolean = false;

  order = new SubjectProp<Order>(null);

  formGroup = new FormGroup({
    number: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    deliveryId: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
    items: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
  });

  constructor(public api: OrdersApiService) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    this.api.orders.value = [];
  }

  submitForm() {}
}
