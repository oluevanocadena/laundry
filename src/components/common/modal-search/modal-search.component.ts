import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HelperPage } from '@components/common/helper.page';
import { FormProp } from '@globals/types/form.type';

@Component({
  selector: 'modal-search',
  standalone: false,
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss'],
})
export class ModalSearchComponent extends HelperPage implements OnInit {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onSearch = new EventEmitter<string>();

  //FormGroup
  formGroup = new FormGroup({
    search: new FormControl(),
  });

  public search = new FormProp<string>(this.formGroup, 'search');

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  onSearchClick() {
    this.onSearch.emit(this.search.value ?? '');
    this.close();
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  openModal() {
    this.show = true;
  }

  /**
   * Getters
   */

  get showDot() {
    return this.search.value?.toString().trim() !== '' && this.search.value !== null;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
