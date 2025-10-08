import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountsDraftFacade } from '@bussiness/accounts/controllers/accounts.draft.facade';

@Component({
  selector: 'users-change-password-modal',
  standalone: false,
  templateUrl: './users-change-password-modal.component.html',
  styleUrls: ['./users-change-password-modal.component.scss'],
})
export class UsersChangePasswordModalComponent implements OnInit {
  private _show = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<void>();

  constructor(public facade: AccountsDraftFacade) {}

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(false);
  }

  confirm() {
    this.onConfirm.emit();
  }

  /**
   * Getters
   */

  get showInstructions(): boolean {
    return this.facade.formGroupPassword.get('password')?.value !== this.facade.formGroupPassword.get('confirmPassword')?.value;
  }

  get passwordNotMatch(): boolean {
    return this.facade.formGroupPassword.get('password')?.value !== this.facade.formGroupPassword.get('confirmPassword')?.value;
  }

  get canSave(): boolean {
    return this.facade.formGroupPassword.valid && this.passwordNotMatch === false;
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
