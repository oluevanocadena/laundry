import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'modal-sort',
  standalone: false,
  templateUrl: './modal-sort.component.html',
  styleUrls: ['./modal-sort.component.scss'],
})
export class ModalSortComponent extends HelperPage implements OnInit {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSort: EventEmitter<string> = new EventEmitter<string>();

  //FormGroup
  formGroup = new FormGroup({
    sort: new FormControl(''),
  });

  constructor() {
    super();
  }

  /**
   * API Calls
   */

  /**
   * UI Events
   */

  onSortClick() {
    this.onSort.emit(this.sort);
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Getters
   */

  get sort() {
    return this.formGroup.get('sort')?.value ?? '';
  }

  get canContinue() {
    return this.formGroup.valid;
  }
  /**
   * Lifecycle
   */

  ngOnInit() {}
}
