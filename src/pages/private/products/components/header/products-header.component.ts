import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAppearanceOptions } from '@taiga-ui/core';
import moment from 'moment';
import { routes } from '@app/routes';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'products-header',
  standalone: false,
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss'],
})
export class ProductsHeaderComponent extends HelperPage {



  constructor(public router: Router, public facade: ProductsDraftFacade) {
    super();
  }
  /**
   * UI Events
   */

  saveProduct() {
    this.facade.submitForm();
  }

  onBack() {
    this.router.navigate([routes.Products]);
  }

  /**
   * Getters
   */

  get busy(): boolean {
    return this.facade.api.busy.value;
  }

  get dateCreated(): string {
    return (
      this.facade.product.value?.created_at ||
      moment().locale('es').toDate().toString()
    );
  }

  get productName(): string {
    return this.facade.product.value?.Name || '';
  }

  get productStatus(): string {
    switch (this.facade.product.value?.Disabled) {
      case true:
        return 'Inactivo';
      case false:
        return 'Activo';
      default:
        return 'Activo';
    }
  }

  get productStatusAppearance(): TuiAppearanceOptions['appearance'] {
    return this.facade.product.value?.Disabled ? 'error' : 'success';
  }

  get canSave(): boolean {
    return (
      this.facade.formGroup.valid &&
      (this.facade.samePrice.value === false
        ? this.facade.locationPrices.every((location) => location.Price > 0)
        : true)
    );
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}
