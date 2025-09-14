import { Injectable } from '@angular/core';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { StorageService } from '@services/common/storage.service';

import { LocationsPageTableColumns } from '@bussiness/locations/constants/locations.columns.constants';
import { LocationsDefaultTableFilter } from '@bussiness/locations/constants/locations.constants';
import { LocationsDraftFacade } from '@bussiness/locations/controllers/locations.draft.facade';
import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { LocationsApiService } from '@bussiness/locations/services/locations.api.service';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';
import { NotificationsPageTableColumns } from '@bussiness/notifications/constants/notifications.columns.constant';

@Injectable({
  providedIn: 'root',
})
export class LocationsMonitorFacade extends FacadeBase {
  //Flag Management
  showLocationDrawer = false;

  //showType
  showType: UITypeFilterShow = {
    calendar: false,
    search: true,
    sort: true,
  };

  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'Activas', value: 'false' },
    { label: 'Inactivas', value: 'true' },
  ];

  tableFilter = new SubjectProp<UITableFilterBase>(LocationsDefaultTableFilter);
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  columns = LocationsPageTableColumns;

  constructor(
    public api: LocationsApiService,
    public draftFacade: LocationsDraftFacade,
    public storageService: StorageService,
  ) {
    super(api);
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
    this.api.getPagedLocations({
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
    this.fetchLocations();
  }

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('LOCATIONS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    console.log('👉🏽 filter', filter);
    this.tableFilter.value = filter as UITableFilterBase;
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
