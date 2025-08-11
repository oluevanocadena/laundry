import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationsDraftFacade } from '../../../../bussiness/locations/controllers/locations.draft.facade';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'locations-drawer-draft',
  standalone: false,
  templateUrl: './locations-drawer-draft.component.html',
  styleUrls: ['./locations-drawer-draft.component.scss'],
})
export class LocationsDrawerDraftComponent implements OnInit {
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      if (this.facade.selectedLocation.value) {
        this.facade.fillForm();
      } else {
        this.facade.clearState();
      }
    } else {
      this.facade.clearState();
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() closeLabel = 'Cancelar';
  @Input() confirmLabel = 'Confirmar';
  @Input() confirmStyle: DrawerConfirmStyleButton = 'success';

  constructor(
    public facade: LocationsDraftFacade,
    public nzMessageService: NzMessageService
  ) {}

  /**
   * UI Events
   */

  close(avoidMessage: boolean = false) {
    if (avoidMessage === false) {
      this.nzMessageService.info('¡No se guardaron los cambios! ✖️');
    }
    this.show = false;
    this.showChange.emit(this.show);
  }

  confirm() {
    if (this.facade.formGroup.valid) {
      this.facade.submitForm();
      this.close(true);
    } else {
      this.nzMessageService.error(
        'Por favor, completa todos los campos requeridos.😉'
      );
    }
  }
  /**
   * Getters
   */

  get labelStatus(): string {
    return this.facade.edition &&
      this.facade.selectedLocation.value?.Disabled === false
      ? 'Activa'
      : 'Borrador';
  }

  get disabled(): boolean {
    return this.facade.selectedLocation.value?.Disabled === true;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}

export type DrawerConfirmStyleButton =
  | 'danger'
  | 'primary'
  | 'warning'
  | 'success'
  | 'info';

export const BUTTON_STYLES = [
  'danger',
  'primary',
  'warning',
  'success',
  'info',
] as const;
