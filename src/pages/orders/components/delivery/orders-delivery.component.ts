import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'orders-delivery',
  standalone: false,
  templateUrl: './orders-delivery.component.html',
  styleUrls: ['./orders-delivery.component.scss'],
})
export class OrdersDeliveryComponent implements OnInit {
  @Input() edition: boolean = false;

  //formGroup
  formGroup = new FormGroup({
    receiverName: new FormControl(''),
    deliveryType: new FormControl(''),
    deliveryDate: new FormControl(''),
    deliveryTime: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}
}
