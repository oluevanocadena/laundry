import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationsDraftFacade } from '@bussiness/locations/controllers/locations.draft.facade';
import { HelperPage } from '@components/common/helper.page';
import { TuiAppearanceOptions } from '@taiga-ui/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'locations-drawer-draft',
  standalone: false,
  templateUrl: './locations-drawer-draft.component.html',
  styleUrls: ['./locations-drawer-draft.component.scss'],
})
export class LocationsDrawerDraftComponent extends HelperPage implements OnInit {
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value && this.facade.selectedLocation.value) {
      this.facade.fillForm();
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

  constructor(public facade: LocationsDraftFacade, public nzMessageService: NzMessageService) {
    super();
  }

  /**
   * UI Events
   */

  close(avoidMessage: boolean = false) {
    if (avoidMessage === false) {
      this.nzMessageService.info('¡No se guardó ningún cambio!');
    }
    this.show = false;
    this.showChange.emit(false);
  }

  confirm() {
    if (!this.facade.formGroup.valid) {
      this.nzMessageService.error('Por favor, completa todos los campos requeridos.😉');
      return;
    }

    this.facade.submitForm().then((response) => {
      if (response?.success) {
        this.facade.repo.getAll();
        this.close(true);
      } else {
        this.nzMessageService.error('¡Ocurrió un error al guardar los cambios!');
      }
    });
  }

  onDisableOrEnableClick() {
    if (this.facade.repo.locations.value?.length === 1) {
      this.nzMessageService.error('¡No se puede deshabilitar la única sucursal!');
      return;
    }
    this.facade.showDisableModal = true;
  }

  onDeleteClick() {
    if (this.facade.repo.locations.value?.length === 1) {
      this.nzMessageService.error('¡No se puede eliminar la única sucursal!');
      return;
    }
    this.facade.showDeleteModal = true;
  }

  onDisable() {
    const location = this.facade.selectedLocation.value;
    if (location?.id) {
      this.facade.disableLocation(location.id, location.Disabled || false).then(() => {
        this.facade.selectedLocation.value!.Disabled = !this.facade.selectedLocation.value!.Disabled;
        this.nzMessageService.success(
          '¡Sucursal ' + (this.facade.selectedLocation.value!.Disabled ? 'habilitada' : 'deshabilitada') + ' correctamente!',
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
    if (!this.facade.edition) return 'Borrador';
    return this.facade.selectedLocation.value?.Disabled ? 'Inactiva' : 'Activa';
  }

  get appearance(): TuiAppearanceOptions['appearance'] {
    return this.facade.selectedLocation.value?.Disabled ? 'error' : this.facade.edition ? 'success' : 'warning';
  }

  get disabled(): boolean {
    return this.facade.selectedLocation.value?.Disabled === true;
  }

  get busy(): boolean {
    return this.facade.repo.busy.value;
  }

  get canDisableOrDelete(): boolean {
    return this.facade.repo.locations.value?.length !== 1;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}

export type DrawerConfirmStyleButton = 'danger' | 'primary' | 'warning' | 'success' | 'info';

export const BUTTON_STYLES = ['danger', 'primary', 'warning', 'success', 'info'] as const;
