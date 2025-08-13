import { Injectable } from '@angular/core';
import { FacadeBase } from '../../../types/facade.base';
import { ProductsApiService } from '../products.api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageProp } from '../../../types/storage.type';
import { Product } from '../products.interfaces';
import { LocationsApiService } from '../../../bussiness/locations/locations.api.service';
import { FormProp } from '../../../types/form.type';

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
    price: new FormControl(0, [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
    samePrice: new FormControl(true, [Validators.required]),
  });

  public samePrice = new FormProp(this.formGroup, 'samePrice', true);

  public selectedProduct = new StorageProp<Product>(null, 'PRODUCT_EDITION');
  public locationPrices: LocationPrice[] = [];

  constructor(
    public api: ProductsApiService,
    public locationApi: LocationsApiService
  ) {
    super(api);
  }

  initialize() {
    this.api.getProductCategories();
    this.locationApi.getLocations();
  }

  bindEvents() {
    this.locationApi.locations.onChange((locations) => {
      console.log('🚩 locations', locations);
      this.locationPrices =
        locations.map((location) => {
          return {
            LocationId: location.id || '',
            LocationName: location.Name || '',
            Price: 0,
          };
        }) || [];
    });

    this.samePrice.onChange((value) => {
      console.log('🚩 samePrice', value);
      // Only for same price
      if (value === false) {
        this.locationPrices.forEach((location) => {
          location.Price = this.formGroup.controls.price.value || 0;
        });
      }
    });
  }

  clearState() {}

  submitForm() {}
}

export interface LocationPrice {
  LocationId: string;
  LocationName: string;
  Price: number;
}
