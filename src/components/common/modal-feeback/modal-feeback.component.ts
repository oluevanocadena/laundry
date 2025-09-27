import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeedbackDraftFacade } from '@bussiness/feedback/controllers/feeback.draft.facade';

import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'modal-feeback',
  standalone: false,
  templateUrl: './modal-feeback.component.html',
  styleUrls: ['./modal-feeback.component.scss'],
})
export class ModalFeebackComponent extends HelperPage implements OnInit {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  constructor(public facade: FeedbackDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
    this.onClose.emit();
  }

  confirm() {
    this.facade.submitForm();
  }

  /**
   * Getters
   */

  get busy(): boolean {
    return this.facade.repo.busy.value;
  }

  get canSave(): boolean {
    return this.facade.formGroup.valid;
  }

  get options(): UISelectOption[] {
    return this.facade.options;
  }

  get formGroup(): FormGroup {
    return this.facade.formGroup;
  }

  /**
   * Lifecycle
   */

  ngOnInit(): void {}
}
