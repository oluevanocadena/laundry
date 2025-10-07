import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { routes } from '@app/routes';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { StorageProp } from '@globals/types/storage.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { ILocationsRepository } from '@bussiness/locations/repository/locations.repository';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';
import { Product, ProductLocation, ProductLocationPrice } from '@bussiness/products/interfaces/products.interfaces';
import { IProductsRepository } from '@bussiness/products/repository/products.repository';
import { IUnitMeasureRepository } from '@bussiness/products/repository/unit.measure.repository';
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
    public repo: IProductsRepository,
    public repoUnitMeasures: IUnitMeasureRepository,
    public repoProdCat: IProductCategoriesRepository,
    public repoLocations: ILocationsRepository,
    public nzMessageService: NzMessageService,
    public router: Router,
    public sessionService: SessionService,
  ) {
    super(repo);
  }

  override initialize() {
    super.initialize();
    this.repoUnitMeasures.getAll();
    this.repoProdCat.getAll();
    this.repoLocations.getAll();
    this.fillForm();
  }

  bindEvents() {
    this.repoLocations.locations.onChange((locations) => {
      const prices = this.product.value?.ProductLocationPrice || [];
      const availability = this.product.value?.ProductLocations || [];
      this.locationPrices =
        locations.map((location: Location) => {
          const price = prices.find((productLocationPrice) => productLocationPrice.LocationId === location.id);
          return {
            LocationId: location.id || '',
            ProductId: this.product.value?.id || '',
            Price: price?.Price ?? 0,
            Location: location,
          };
        }) || [];
      this.locationAvailability =
        locations?.map((loc) => {
          const avaiLoc = availability.find((avaiLoc) => avaiLoc.LocationId === loc.id);
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
        this.locationPrices = Array.from(this.locationPrices).map((location) => {
          location.Price = this.price.value ?? 0;
          return location;
        });
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
          product?.ProductLocationPrice?.length && product?.ProductLocationPrice?.length > 0
            ? product?.ProductLocationPrice?.every((location) => location.Price === product.Price)
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
        QtyStoresAvailable: this.locationAvailability.filter((location) => location.IsEnabled === true).length,
      };
      if (this.samePrice.value === true) {
        this.locationPrices = Array.from(this.locationPrices).map((location) => {
          location.Price = this.price.value ?? 0;
          return location;
        });
      }
      this.repo
        .saveWithDependencies(
          product,
          JSON.parse(JSON.stringify(this.locationAvailability)),
          JSON.parse(JSON.stringify(this.locationPrices)),
          JSON.parse(JSON.stringify(this.urlImages)),
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
    this.repo.uploadtImage(file).then((response) => {
      if (response.success) {
        this.urlImages.push(response.data ?? '');
      }
    });
  }

  onDeleteImage(url: string) {
    this.urlImages = this.urlImages.filter((image) => image !== url);
  }

  onDelete() {
    const product = this.product.value;
    if (product?.id) {
      this.repo.delete(product.id).then(() => {
        this.router.navigate([routes.Products]);
      });
    }
  }

  onDisable() {
    const product = this.product.value;
    if (!product?.id) return;

    const newDisabledState = !product.Disabled;
    const successMsg = newDisabledState ? 'deshabilitado' : 'habilitado';

    this.repo.disable(product.id, newDisabledState).then((response) => {
      if (response.success) {
        this.nzMessageService.success(`Producto ${successMsg} correctamente`);
        const updatedProduct = UtilsDomain.clone(this.product.value!);
        updatedProduct.Disabled = newDisabledState;
        this.product.value = updatedProduct;
      } else {
        this.nzMessageService.error(`Ocurrió un error al ${successMsg} el producto`);
      }
      this.showDisableModal = false;
    });
  }

  openDisableModal() {
    this.showDisableModal = true;
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }
}
