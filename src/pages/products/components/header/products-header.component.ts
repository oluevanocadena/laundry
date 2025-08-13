import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { Router } from '@angular/router';
import { routes } from '../../../../app/routes';
import { ProductsDraftFacade } from '../../../../bussiness/products/controllers/products.draft.facade';
import { TuiAppearanceOptions } from '@taiga-ui/core';

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
    return this.facade.selectedProduct.value?.created_at || '';
  }

  get productStatus(): string {
    switch (this.facade.selectedProduct.value?.Disabled) {
      case true:
        return 'Inactivo';
      case false:
        return 'Activo';
      default:
        return 'Activo';
    }
  }

  get productStatusAppearance(): TuiAppearanceOptions['appearance'] {
    return this.facade.selectedProduct.value?.Disabled ? 'error' : 'success';
  }

  get canSave(): boolean {
    return this.facade.formGroup.valid;
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}
