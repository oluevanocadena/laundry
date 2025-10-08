import { Injectable } from '@angular/core';
import { Customer } from '@bussiness/customers/interfaces/customers.interfaces';
import { ICustomersRepository } from '@bussiness/customers/repository/customers.repository';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { ProductCategory } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';
import { IProductsRepository } from '@bussiness/products/repository/products.repository';
import { SessionService } from '@bussiness/session/services/session.service';
import { FacadeBase } from '@globals/types/facade.base';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Injectable({
  providedIn: 'root',
})
export class PosFacade extends FacadeBase {
  tabIndex = 0;
  categories = new SubjectProp<ProductCategory[]>([]);
  posCustomer = new StorageProp<Customer | null>(null, 'POS_CUSTOMER');

  constructor(
    public repoProducts: IProductsRepository,
    public repoCategories: IProductCategoriesRepository,
    public repoCustomers: ICustomersRepository,
    public sessionService: SessionService,
    public ordersDraftFacade: OrdersDraftFacade,
  ) {
    super(repoProducts);
  }

  override initialize() {
    super.initialize();
    this.ordersDraftFacade.initialize();
    this.fetchPosCustomer();
    this.repoCategories.getAll();
  }

  bindEvents() {
    this.subscriptions.add(
      this.repoCategories.productCategories.onChange((categories) => {
        const categoriesClone: ProductCategory[] = UtilsDomain.clone(categories?.data ?? []);
        categoriesClone.unshift({
          id: '0',
          Name: 'Mas vendidos',
          OrganizationId: this.sessionService.organizationId,
        });
        this.categories.value = categoriesClone;
        this.tabIndex = 0;
      }),
    );
  }

  clearState() {
    // TODO: Implement clearState
  }

  submitForm() {
    // TODO: Implement submitForm
  }

  /**
   * methods
   */

  async fetchPosCustomer() {
    const result = await this.repoCustomers.getPosCustomer(this.sessionService.organizationId, true);
    if (result?.success && result.data) {
      this.posCustomer.value = result.data; 
      this.ordersDraftFacade.onSelectCustomer(result.data);
    }
  }

  /**
   * Events
   */

  onTabIndexChange(index: number) {
    const locationId = this.sessionService.locationId;
    const productCategoryId = this.categories.value?.[index]?.id?.toString();
    this.repoProducts.search('', 1, 20, locationId, productCategoryId === '0' ? undefined : productCategoryId);
  }
}
