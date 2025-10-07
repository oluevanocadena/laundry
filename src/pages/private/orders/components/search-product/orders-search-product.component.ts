import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { ProductsDomain } from '@bussiness/products/domains/products.domain';
import { Product } from '@bussiness/products/interfaces/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { HelperTablePage } from '@components/common/helper.table.page';
import { FormProp } from '@globals/types/form.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: 'orders-search-product',
  standalone: false,
  templateUrl: './orders-search-product.component.html',
  styleUrls: ['./orders-search-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersSearchProductComponent extends HelperTablePage<Product> implements OnInit {
  utils = UtilsDomain;
  ProductsDomain = ProductsDomain;

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();

  product: Product | null = null;

  formGroup = new FormGroup({
    search: new FormControl(''),
    quantity: new FormControl<number | undefined>(1),
  });
  search = new FormProp(this.formGroup, 'search', '');
  quantity = new FormProp(this.formGroup, 'quantity', 1);

  constructor(public facade: OrdersDraftFacade, public sessionService: SessionService, public cdr: ChangeDetectorRef) {
    super();
  }

  /**
   * UI Events
   */

  confirm() {
    if (this.product) {
      this.facade.onSelectProduct(this.product, this.quantity.value ?? 0);
      this.cdr.detectChanges();
      this.close();
    }
  }

  selectProduct(product: Product) {
    this.product = product;
    this.quantity.value = 1;
    this.cdr.detectChanges();
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  isSelected(product: Product) {
    return this.product && this.product.id === product.id;
  }

  /**
   * Getters
   */

  get busy(): boolean {
    return this.facade.repoProducts.busy.value;
  }

  get products(): Product[] {
    return (
      this.facade.repoProducts.products.value?.data?.filter((product) => {
        return product.ProductLocationPrice?.find(
          (price) => price.LocationId === this.sessionService.sessionInfo.value?.Location?.id,
        );
      }) ?? []
    );
  }

  get canSave(): boolean {
    return this.product !== null && (this.quantity.value ?? 0) > 0;
  }

  get postFixText(): string {
    return this.product?.UnitMeasure?.Name ? ' ' + this.product?.UnitMeasure?.Name + '(s)' : '';
  }

  /**
   * Life Cicle
   */
  ngOnInit() {
    this.facade.fetchProducts('');
    this.facade.repoProducts.busy.onChange((value) => {
      this.cdr.detectChanges();
    });
  }
}
