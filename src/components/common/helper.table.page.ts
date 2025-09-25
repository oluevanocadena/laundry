import { Component, Input } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  template: '<ng-content></ng-content>',
  styles: [''],
})
export class HelperTablePage<T> extends HelperPage {
  protected _dataSource: any[] | T[] = [];
  @Input() set dataSource(value: any[] | T[]) {
    this._dataSource = value;
    this.filterData();
  }
  get dataSource() {
    return this._dataSource;
  }

  public data: any[] | T[] = [];
  public page: number = 1;
  public pageSize: 10 | 20 | 50 = 50;
  public currentColumnFilters: { field: keyof T | keyof any; value: string }[] = [];
  public usePagination: boolean = true;
  public modeFilter: ICoolModeFilter = 'and';

  public filterData() {
    let filteredData = this.dataSource || [];

    if (this.currentColumnFilters?.length) {
      if (this.modeFilter === 'and') {
        // Filtra con 'AND': todos los filtros deben coincidir
        filteredData = filteredData.filter((item) =>
          this.currentColumnFilters.every(({ field, value }) =>
            String(item[field])?.toLowerCase().includes(value?.toLowerCase()),
          ),
        );
      } else if (this.modeFilter === 'or') {
        // Filtra con 'OR': al menos uno de los filtros debe coincidir
        filteredData = filteredData?.filter((item) =>
          this.currentColumnFilters.some(({ field, value }) =>
            String(item[field])?.toLowerCase().includes(value?.toLowerCase()),
          ),
        );
      }
    }

    this.data = this.usePagination
      ? filteredData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
      : filteredData;
    // console.log('data.length: ', this.data.length, 'filteredData.length: ', filteredData?.length, 'this.dataSource.length: ', this.dataSource.length, 'page: ', this.page, 'size: ', this.pageSize);
  }

  public onNavigate(direction: UINavigationDirection) {
    if (direction === 'back') {
      this.page--;
    }
    if (direction === 'next') {
      this.page++;
    }
    if (this.usePagination) {
      this.filterData();
    } else {
      this.data = this.dataSource;
    }
  }

  /**
   * Getters
   */

  get canBack() {
    return this.page > 1;
  }

  get canNext() {
    return this.data?.length >= this.pageSize ? true : false;
  }
}

export type ICoolModeFilter = 'and' | 'or';
export type UINavigationDirection = 'back' | 'next';
