import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@bussiness/products/interfaces/products.interfaces';

@Component({
  selector: 'pos-product-card',
  standalone: false,
  templateUrl: './pos-product-card.component.html',
  styleUrls: ['./pos-product-card.component.scss'],
})
export class PosProductCardComponent implements OnInit {
  @Input() product: Product = {} as Product;

  constructor() {}

  ngOnInit() {}
}
