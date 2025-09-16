import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';

import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { ProductPageTableColumns } from '@bussiness/products/constants/product.columns.constants';
import { ProductsDefaultTableFilter } from '@bussiness/products/constants/product.constants';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { Product } from '@bussiness/products/interfaces/products.interfaces';
import { ProductsApiService } from '@bussiness/products/services/products.api.service';

import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsMonitorFacade extends FacadeBase {
  showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: true,
    sort: true,
  };

  //Arrays
  segments: NzSegmentedOption[] = [
    { label: 'Todos', value: '0' },
    { label: 'Activos', value: 'true' },
    { label: 'Inactivos', value: 'false' },
  ];

  tableFilter = new SubjectProp<UITableFilterBase>(ProductsDefaultTableFilter);
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  columns = ProductPageTableColumns;

  constructor(
    public router: Router,
    public api: ProductsApiService,
    public draftFacade: ProductsDraftFacade,
    public storageService: StorageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Api
   */
  fetchProducts() {
    this.api.getPagedProduct({
      page: this.tablePagination.value?.page ?? UITableConstants.DefaultPage,
      pageSize: this.tablePagination.value?.pageSize ?? UITableConstants.DefaultPageSize,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
      search: this.tableFilter.value?.search ?? null,
      disabled: this.getSegmentDisabled(this.tableFilter.value?.segment ?? '0'),
    });
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.fetchProducts();
  }

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('PRODUCTS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    console.log('👉🏽 filter', filter);
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchProducts();
  }

  onNewProductClick() {
    this.draftFacade.clearState();
    this.router.navigate([routes.ProductDraft]);
  }

  onProductClick(product: Product) {
    this.draftFacade.product.value = product;
    this.router.navigate([routes.ProductDraft]);
  }

  /**
   * Getters
   */

  getSegmentDisabled(segment: string): boolean | null {
    switch (segment) {
      case '0':
        return null; //All
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return false;
    }
  }
}
