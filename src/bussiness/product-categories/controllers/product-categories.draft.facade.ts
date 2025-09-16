import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FacadeBase } from '@globals/types/facade.base';
import { StorageProp } from '@globals/types/storage.type';

import { ProductCategory } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { ProductCategoriesApiService } from '@bussiness/product-categories/services/product-categories.api.service';
import { SessionService } from '@bussiness/session/services/session.service';

import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisableModal: boolean = false;

  public formGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
  });

  //Subjects
  public selectedProductCategory = new StorageProp<ProductCategory>(null, 'PRODUCT_CATEGORY_EDITION');

  constructor(
    public api: ProductCategoriesApiService,
    public sessionService: SessionService,
    public nzMessageService: NzMessageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    Object.keys(this.formGroup.controls).forEach((key) => {
      const control = this.formGroup.get(key);
      control?.setValue(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.selectedProductCategory.value = null;
    this.edition = false;
  }

  /**
   * API
   */

  submitForm() {
    const value = this.formGroup.value;
    const productCategory: ProductCategory = {
      id: this.edition ? this.selectedProductCategory.value?.id! : undefined,
      Name: value.Name?.toString() || '',
      OrganizationId: this.sessionService.organizationId,
    };
    return this.api.saveProductCategory(productCategory);
  }

  disableProductCategory(id: string, disabled: boolean) {
    return this.api.disableProductCategory(id, disabled).then(() => {
      this.api.getProductCategories();
      if (this.selectedProductCategory.value) {
        this.selectedProductCategory.value.Disabled = !this.selectedProductCategory.value.Disabled;
      }
    });
  }

  deleteProductCategory(id: string) {
    return this.api.deleteProductCategory(id).then(() => {
      this.api.getProductCategories();
      if (this.selectedProductCategory.value) {
        this.selectedProductCategory.value.Deleted = true;
      }
    });
  }

  /**
   * Methods
   */

  fillForm() {
    const value = this.selectedProductCategory.value;
    if (value) {
      this.edition = true;
      this.formGroup.patchValue({
        Name: value.Name,
      });
    } else {
      this.clearState();
    }
  }
}
