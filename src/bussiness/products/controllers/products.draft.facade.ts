import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { routes } from '@app/routes';
import { FacadeBase } from '@type/facade.base';
import { FormProp } from '@type/form.type';
import { StorageProp } from '@type/storage.type';

import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { Location } from '@bussiness/locations/locations.interfaces';
import { ProductsApiService } from '@bussiness/products/products.api.service';
import {
  Product,
  ProductLocation,
  ProductLocationPrice,
} from '@bussiness/products/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisableModal: boolean = false;

  public formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    categoryId: new FormControl<string>('', [Validators.required]),
    unitMeasureId: new FormControl<string>('', [Validators.required]),
    samePrice: new FormControl(true, [Validators.required]),
  });

  public samePrice = new FormProp(this.formGroup, 'samePrice', true);
  public price = new FormProp(this.formGroup, 'price', 0);
  public categoryId = new FormProp<string>(this.formGroup, 'categoryId');
  public unitMeasureId = new FormProp<string>(this.formGroup, 'unitMeasureId');

  public product = new StorageProp<Product>(null, 'PRODUCT_EDITION');
  public locationAvailability: ProductLocation[] = [];
  public locationPrices: ProductLocationPrice[] = [];

  public urlImages: string[] = [];

  constructor(
    public api: ProductsApiService,
    public locationApi: LocationsApiService,
    public nzMessageService: NzMessageService,
    public router: Router,
    public sessionService: SessionService
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.api.getUnitMeasures();
    this.api.getProductCategories();
    this.locationApi.getLocations();
    this.fillForm();
  }

  bindEvents() {
    this.locationApi.locations.onChange((locations) => {
      const prices = this.product.value?.ProductLocationPrice || [];
      const availability = this.product.value?.ProductLocations || [];
      this.locationPrices =
        locations.map((location: Location) => {
          const price = prices.find(
            (productLocationPrice) =>
              productLocationPrice.LocationId === location.id
          );
          return {
            LocationId: location.id || '',
            ProductId: this.product.value?.id || '',
            Price: price?.Price ?? 0,
            Location: location,
          };
        }) || [];
      this.locationAvailability =
        locations?.map((loc) => {
          const avaiLoc = availability.find(
            (avaiLoc) => avaiLoc.LocationId === loc.id
          );
          return {
            IsEnabled: avaiLoc?.IsEnabled ?? true,
            LocationId: loc.id || '',
            ProductId: this.product.value?.id || '',
            Location: loc,
          };
        }) || [];
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
    this.product.value = null;
    this.edition = false;
    this.showDeleteModal = false;
    this.showDisableModal = false;
  }

  fillForm() {
    const product = this.product.value;
    if (product) {
      this.edition = true;
      this.formGroup.patchValue({
        name: product.Name,
        description: product.Description,
        price: product.Price,
        categoryId: product.ProductCategoryId,
        unitMeasureId: product.UnitMeasureId,
        samePrice:
          product?.ProductLocationPrice?.length &&
          product?.ProductLocationPrice?.length > 0
            ? product?.ProductLocationPrice?.every(
                (location) => location.Price === product.Price
              )
            : true,
      });
      this.urlImages = product?.ProductImages?.map((image) => image.Url) || [];
    }
  }

  submitForm() {
    if (this.locationAvailability.length > 0) {
      const value = this.formGroup.value;
      const product: Product = {
        id: this.edition ? this.product.value?.id : undefined,
        Name: value.name?.toString() || '',
        Description: value.description?.toString() || '',
        Price: value.price || 0,
        ImageUrl: this.urlImages[0] || undefined,
        ProductCategoryId: this.categoryId.value || '',
        UnitMeasureId: this.unitMeasureId.value || '',
        OrganizationId: this.sessionService.organizationId,
        QtyStoresAvailable: this.locationAvailability.filter(
          (location) => location.IsEnabled === true
        ).length,
      };
      if (this.samePrice.value === true) {
        this.locationPrices = Array.from(this.locationPrices).map(
          (location) => {
            location.Price = this.price.value ?? 0;
            return location;
          }
        );
      }
      this.api
        .saveProduct(
          product,
          JSON.parse(JSON.stringify(this.locationAvailability)),
          JSON.parse(JSON.stringify(this.locationPrices)),
          JSON.parse(JSON.stringify(this.urlImages))
        )
        .then((product) => {
          this.nzMessageService.success('Producto guardado correctamente');
          this.router.navigate([routes.Products]);
        });
    }
  }

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

  onDelete() {
    const product = this.product.value;
    if (product?.id) {
      this.api.deleteProduct(product.id).then(() => {
        this.router.navigate([routes.Products]);
      });
    }
  }
}
