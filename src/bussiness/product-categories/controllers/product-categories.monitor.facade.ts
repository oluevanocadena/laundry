import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { StorageService } from '@services/common/storage.service';

import { ProductCategoriesPageTableColumns } from '@bussiness/product-categories/constants/product-categories.columns.constants';
import { ProductCategoriesDefaultTableFilter } from '@bussiness/product-categories/constants/product-categories.constants';
import { ProductCategoriesDraftFacade } from '@bussiness/product-categories/controllers/product-categories.draft.facade';
import { ProductCategory } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { ProductCategoriesApiService } from '@bussiness/product-categories/services/product-categories.api.service';
import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableActions, UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesMonitorFacade extends FacadeBase {
  //Flag Management
  showProductCategoryDrawer = false;
  showDeleteProductCategoriesModal = false;
  showDisableProductCategoriesModal = false;

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

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteProductCategoriesModal() },
    {
      label: 'Habilitar/Deshabilitar',
      icon: 'block',
      appearance: 'default',
      action: () => this.openDisableProductCategoriesModal(),
    },
  ];

  constructor(
    public api: ProductCategoriesApiService,
    public draftFacade: ProductCategoriesDraftFacade,
    public storageService: StorageService,
    private nzMessageService: NzMessageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.columns =
      this.storageService.get('PRODUCT_CATEGORIES_COLUMNS') || UtilsDomain.clone(ProductCategoriesPageTableColumns);
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

  onDeleteProductCategories() {
    const ids = this.selectedRows.map((productCategory) => productCategory.id!.toString());
    this.api.deleteProductCategories(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Categorías eliminadas');
        this.fetchProductCategories();
      } else {
        this.nzMessageService.error('Ocurrió un error al eliminar las categorías');
      }
      this.showDeleteProductCategoriesModal = false;
    });
  }

  onDisableProductCategories() {
    const ids = this.selectedRows.map((productCategory) => productCategory.id!.toString());
    this.api.disableProductCategories(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Categorías deshabilitadas');
        this.fetchProductCategories();
      } else {
        this.nzMessageService.error('Ocurrió un error al deshabilitar las categorías');
      }
      this.showDisableProductCategoriesModal = false;
    });
  }

  openDeleteProductCategoriesModal() {
    this.showDeleteProductCategoriesModal = true;
  }

  openDisableProductCategoriesModal() {
    this.showDisableProductCategoriesModal = true;
  }

  /**
   * Getters
   */

  get selectedRows() {
    return this.api.pagedProductCategories.value?.data.filter((productCategory) => productCategory.Checked) ?? [];
  }
}
