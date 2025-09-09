import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class FilterTableService {
  formGroup = new FormGroup({
    page: new FormControl(1),
    pageSize: new FormControl(10),
  });

  page = new FormProp<number>(this.formGroup, 'page', 1);
  pageSize = new FormProp<number>(this.formGroup, 'pageSize', 10);

  totalPages = new SubjectProp<number>(0);

  constructor() {}

  calcTotalPages(total: number) {
    this.totalPages.value = Math.ceil(total / (this.pageSize.value ?? 0));
  }

  /**
   * Getters
   */
}
