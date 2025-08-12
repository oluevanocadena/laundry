import { Injectable } from '@angular/core';
import { FacadeBase } from '../../../types/facade.base';
import { ProductsApiService } from '../products.api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageProp } from '../../../types/storage.type';
import { Product } from '../products.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisableModal: boolean = false;

  public formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  public selectedProduct = new StorageProp<Product>(null, 'PRODUCT_EDITION');

  constructor(public api: ProductsApiService) {
    super(api);
  }

  initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {}
}
