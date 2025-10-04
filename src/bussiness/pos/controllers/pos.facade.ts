import { Injectable } from '@angular/core';
import { ProductCategory } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';
import { IProductsRepository } from '@bussiness/products/repository/products.repository';
import { SessionService } from '@bussiness/session/services/session.service';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Injectable({
  providedIn: 'root',
})
export class PosFacade extends FacadeBase {
  tabIndex = 0;
  categories = new SubjectProp<ProductCategory[]>([]);

  constructor(
    public repoProducts: IProductsRepository,
    public repoCategories: IProductCategoriesRepository,
    public sessionService: SessionService,
  ) {
    super(repoProducts);
  }

  override initialize() {
    super.initialize();
    this.repoCategories.getAll();
  }

  bindEvents() {
    this.repoCategories.productCategories.onChange((categories) => {
      const categoriesClone: ProductCategory[] = UtilsDomain.clone(categories?.data ?? []);
      categoriesClone.unshift({
        id: '0',
        Name: 'Mas vendidos',
        OrganizationId: this.sessionService.organizationId,
      });
      this.categories.value = categoriesClone;
      this.tabIndex = 0;
    });
  }

  clearState() {
    // TODO: Implement clearState
  }

  submitForm() {
    // TODO: Implement submitForm
  }

  /**
   * Events
   */

  onTabIndexChange(index: number) {
    const locationId = this.sessionService.locationId;
    const productCategoryId = this.categories.value?.[index]?.id?.toString();
    console.log(productCategoryId);
    this.repoProducts.search('', 1, 20, locationId, productCategoryId === '0' ? undefined : productCategoryId);
  }
}
