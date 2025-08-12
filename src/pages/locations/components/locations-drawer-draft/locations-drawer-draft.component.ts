import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationsDraftFacade } from '../../../../bussiness/locations/controllers/locations.draft.facade';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocationsMonitorFacade } from '../../../../bussiness/locations/controllers/locations.monitor.facade';

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
      this.nzMessageService.info('¡No se guardó ningún cambio! ℹ️');
    }
    this.show = false;
    this.showChange.emit(this.show);
  }

  confirm() {
    if (this.facade.formGroup.valid) {
      this.facade.submitForm().then((success: boolean | null) => {
        if (success === true) {
          this.close(true);
        }
      });
    } else {
      this.nzMessageService.error(
        'Por favor, completa todos los campos requeridos.😉'
      );
    }
  }

  onDisableOrEnableClick() {
    if (this.facade.api.locations.value?.length === 1) {
      this.nzMessageService.error(
        '¡No se puede deshabilitar la única sucursal! ⛔'
      );
      return;
    }
    this.facade.showDisableModal = true;
  }

  onDeleteClick() {
    if (this.facade.api.locations.value?.length === 1) {
      this.nzMessageService.error(
        '¡No se puede eliminar la única sucursal! ⛔'
      );
      return;
    }
    this.facade.showDeleteModal = true;
  }

  onDisable() {
    const location = this.facade.selectedLocation.value;
    if (location?.id) {
      this.facade
        .disableLocation(location.id, location.Disabled || false)
        .then(() => {
          this.facade.selectedLocation.value!.Disabled =
            !this.facade.selectedLocation.value!.Disabled;
          this.nzMessageService.success(
            '¡Sucursal ' +
              (this.facade.selectedLocation.value!.Disabled
                ? 'habilitada'
                : 'deshabilitada') +
              ' correctamente! ✅'
          );
          this.close(true);
        });
    }
  }

  onDelete() {
    const location = this.facade.selectedLocation.value;
    if (location?.id) {
      this.facade.deleteLocation(location.id);
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

  get busy(): boolean {
    return this.facade.api.busy.value;
  }

  get canDisableOrDelete(): boolean {
    return this.facade.api.locations.value?.length !== 1;
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
