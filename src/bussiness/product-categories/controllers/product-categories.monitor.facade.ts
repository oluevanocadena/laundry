import { Injectable } from '@angular/core';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { StorageService } from '@services/common/storage.service';

import { ProductCategoriesPageTableColumns } from '@bussiness/product-categories/constants/product-categories.columns.constants';
import { ProductCategoriesDefaultTableFilter } from '@bussiness/product-categories/constants/product-categories.constants';
import { ProductCategoriesApiService } from '@bussiness/product-categories/services/product-categories.api.service';
import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { ProductCategory } from '../interfaces/product-categories.interfaces';
import { ProductCategoriesDraftFacade } from './product-categories.draft.facade';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesMonitorFacade extends FacadeBase {
  //Flag Management
  showProductCategoryDrawer = false;

  //showType
  showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: true,
    sort: true,
  };

  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'Activas', value: 'false' },
    { label: 'Inactivas', value: 'true' },
  ];

  tableFilter = new SubjectProp<UITableFilterBase>(ProductCategoriesDefaultTableFilter);
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  columns = ProductCategoriesPageTableColumns;

  constructor(
    public api: ProductCategoriesApiService,
    public draftFacade: ProductCategoriesDraftFacade,
    public storageService: StorageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.columns = this.storageService.get('PRODUCT_CATEGORIES_COLUMNS') || UtilsDomain.clone(ProductCategoriesPageTableColumns);
    this.fetchProductCategories();
    this.bindEvents();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Api
   */

  fetchProductCategories() {
    this.api.getPagedProductCategories({
      page: this.tablePagination.value?.page ?? UITableConstants.DefaultPage,
      pageSize: this.tablePagination.value?.pageSize ?? UITableConstants.DefaultPageSize,
      dateFrom: this.tableFilter.value?.dateFrom ?? null,
      dateTo: this.tableFilter.value?.dateTo ?? null,
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
    this.fetchProductCategories();
  }

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('PRODUCT_CATEGORIES_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    console.log('👉🏽 filter', filter);
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchProductCategories();
  }

  onNewProductCategoryClick() {
    this.draftFacade.selectedProductCategory.value = null;
    this.showProductCategoryDrawer = true;
  }

  onProductCategoryClick(productCategory: ProductCategory) {
    this.draftFacade.selectedProductCategory.value = productCategory;
    this.showProductCategoryDrawer = true;
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
