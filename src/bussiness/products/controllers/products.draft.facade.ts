import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsApiService } from '../../../bussiness/locations/locations.api.service';
import { FacadeBase } from '../../../types/facade.base';
import { FormProp } from '../../../types/form.type';
import { StorageProp } from '../../../types/storage.type';
import { ProductsApiService } from '../products.api.service';
import { Product, ProductLocation } from '../products.interfaces';
import { Location } from '../../locations/locations.interfaces';
import { SubjectProp } from '../../../types/subject.type';

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
  public price = new FormProp(this.formGroup, 'price', 0);

  public selectedProduct = new StorageProp<Product>(null, 'PRODUCT_EDITION');
  public productLocations = new SubjectProp<ProductLocation[]>([]);
  public locationPrices: LocationPrice[] = [];

  public urlImages: string[] = [];

  constructor(
    public api: ProductsApiService,
    public locationApi: LocationsApiService
  ) {
    super(api);
  }

  initialize() {
    this.api.getProductCategories();
    if (this.edition === false) {
      this.locationApi.getLocations();
    }
  }

  bindEvents() {
    this.locationApi.locations.onChange((locations) => {
      if (this.edition === false) {
        // Only get from server for new products
        this.locationPrices =
          locations.map((location: Location) => {
            return {
              LocationId: location.id || '',
              LocationName: location.Name || '',
              Price: 0,
            };
          }) || [];
        this.productLocations.value =
          locations?.map((loc) => ({
            IsEnabled: true,
            LocationId: loc.id || '',
            ProductId: '',
            Location: loc,
          })) || [];
      }
    });

    this.price.onChange((value) => {
      if (this.samePrice.value === true) {
        this.locationPrices = Array.from(this.locationPrices).map(
          (location) => {
            location.Price = this.price.value ?? 0;
            return location;
          }
        );
      }
    });
  }

  clearState() {
    this.formGroup.reset();
    this.urlImages = [];
    this.selectedProduct.value = null;
    this.edition = false;
    this.showDeleteModal = false;
    this.showDisableModal = false;
  }

  submitForm() {}

  /**
   * UI Events
   */

  onSelectedImage(file: File) {
    this.api.uploadProductImage(file).then((url) => {
      if (url) {
        this.urlImages.push(url);
      }
    });
  }

  onDeleteImage(url: string) {
    console.log('📷 url', url);
    this.urlImages = this.urlImages.filter((image) => image !== url);
  }
}

export interface LocationPrice {
  LocationId: string;
  LocationName: string;
  Price: number;
}
