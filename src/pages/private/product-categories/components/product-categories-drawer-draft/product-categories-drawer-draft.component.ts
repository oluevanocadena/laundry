import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ProductCategoriesDraftFacade } from '@bussiness/product-categories/controllers/product-categories.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'product-categories-drawer-draft',
  standalone: false,
  templateUrl: './product-categories-drawer-draft.component.html',
  styleUrls: ['./product-categories-drawer-draft.component.scss'],
})
export class ProductCategoriesDrawerDraftComponent extends HelperPage implements OnInit {
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value && this.facade.selectedProductCategory.value) {
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

  constructor(public facade: ProductCategoriesDraftFacade, public nzMessageService: NzMessageService) {
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
        this.facade.api.getProductCategories();
        this.close(true);
      } else {
        this.nzMessageService.error('¡Ocurrió un error al guardar los cambios!');
      }
    });
  }

  onDisableOrEnableClick() { 
    this.facade.showDisableModal = true;
  }

  onDeleteClick() {
    if (this.facade.api.productCategories.value?.length === 1) {
      this.nzMessageService.error('¡No se puede eliminar la única categoría!');
      return;
    }
    this.facade.showDeleteModal = true;
  }

  onDisable() {
    const location = this.facade.selectedProductCategory.value;
    if (location && location.id) {
      this.facade.disableProductCategory(location.id.toString(), location.Disabled || false).then(() => {
        this.facade.selectedProductCategory.value!.Disabled = !this.facade.selectedProductCategory.value!.Disabled;
        this.nzMessageService.success(
          '¡Categoría ' +
            (this.facade.selectedProductCategory.value!.Disabled ? 'habilitada' : 'deshabilitada') +
            ' correctamente!',
        );
        this.close(true);
      });
    }
  }

  onDelete() {
    const productCategory = this.facade.selectedProductCategory.value;
    if (productCategory && productCategory.id) {
      this.facade.deleteProductCategory(productCategory.id.toString());
    }
  }

  /**
   * Getters
   */

  get labelStatus(): string {
    return this.facade.edition && this.facade.selectedProductCategory.value?.Disabled === false ? 'Activa' : 'Borrador';
  }

  get disabled(): boolean {
    return this.facade.selectedProductCategory.value?.Disabled === true;
  }

  get busy(): boolean {
    return this.facade.api.busy.value;
  }

  get canDisableOrDelete(): boolean {
    return this.facade.api.productCategories.value?.length !== 1;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}

export type DrawerConfirmStyleButton = 'danger' | 'primary' | 'warning' | 'success' | 'info';

export const BUTTON_STYLES = ['danger', 'primary', 'warning', 'success', 'info'] as const;
