import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { StorageService } from '@services/common/storage.service';

import { LocationsPageTableColumns } from '@bussiness/locations/constants/locations.columns.constants';
import { LocationsDefaultTableFilter } from '@bussiness/locations/constants/locations.constants';
import { LocationsDraftFacade } from '@bussiness/locations/controllers/locations.draft.facade';
import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { ILocationsRepository } from '@bussiness/locations/repository/locations.repository';

import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { PagedRequest } from '@globals/interfaces/requests.interface';
import { UITableActions, UITableColumn, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Injectable({
  providedIn: 'root',
})
export class LocationsMonitorFacade extends FacadeBase {
  //Flag Management
  showLocationDrawer = false;
  showDeleteLocationsModal = false;
  showDisableLocationsModal = false;

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

  tableFilter = new SubjectProp<PagedRequest>(LocationsDefaultTableFilter);
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  columns = LocationsPageTableColumns;

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteLocationsModal() },
    { label: 'Habilitar/Deshabilitar', icon: 'block', appearance: 'default', action: () => this.openDisableLocationsModal() },
  ];

  constructor(
    public repo: ILocationsRepository,
    public draftFacade: LocationsDraftFacade,
    public storageService: StorageService,
    private nzMessageService: NzMessageService,
  ) {
    super(repo);
  }

  override initialize() {
    super.initialize();
    console.log('👉🏽 initialize', this.storageService.get('LOCATIONS_COLUMNS'));
    this.columns = this.storageService.get('LOCATIONS_COLUMNS') || UtilsDomain.clone(LocationsPageTableColumns);
    this.fetchLocations();
    this.bindEvents();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Api
   */

  fetchLocations() {
    this.repo.getPaged({
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
    this.repo.cacheStore.clear();
    this.fetchLocations();
  }

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('LOCATIONS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: PagedRequest) {
    console.log('👉🏽 filter', filter);
    this.tableFilter.value = filter as PagedRequest;
    this.fetchLocations();
  }

  onNewLocationClick() {
    this.draftFacade.selectedLocation.value = null;
    this.showLocationDrawer = true;
  }

  onLocationClick(location: Location) {
    this.draftFacade.selectedLocation.value = location;
    this.showLocationDrawer = true;
  }

  onDeleteLocations() {
    const ids = this.selectedRows.map((location) => location.id!);
    this.repo.deleteMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Sucursales eliminadas');
        this.fetchLocations();
      } else {
        this.nzMessageService.error('Ocurrió un error al eliminar las sucursales');
      }
      this.showDeleteLocationsModal = false;
    });
  }

  onDisableLocations() {
    const ids = this.selectedRows.map((location) => location.id!);
    this.repo.toggleEnableMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Sucursales deshabilitadas');
        this.fetchLocations();
      } else {
        this.nzMessageService.error('Ocurrió un error al deshabilitar las sucursales');
      }
      this.showDisableLocationsModal = false;
    });
  }

  openDeleteLocationsModal() {
    this.showDeleteLocationsModal = true;
  }

  openDisableLocationsModal() {
    this.showDisableLocationsModal = true;
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

  get selectedRows() {
    return this.repo.pagedLocations.value?.data.filter((location) => location.Checked && location.Default === false) ?? [];
  }
}
