import { Component, OnInit } from '@angular/core';
import { ProductsDraftFacade } from '../../../../bussiness/products/controllers/products.draft.facade';

@Component({
  selector: 'products-media',
  standalone: false,
  templateUrl: './products-media.component.html',
  styleUrls: ['./products-media.component.scss'],
})
export class ProductsMediaComponent implements OnInit {
  constructor(public facade: ProductsDraftFacade) {}

  ngOnInit() {}
}
