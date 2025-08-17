import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { Product } from '@bussiness/products/products.interfaces';
import { HelperTablePage } from '@components/common/helper.table.page';
import { FormProp } from '@type/form.type';

@Component({
  selector: 'orders-search-product',
  standalone: false,
  templateUrl: './orders-search-product.component.html',
  styleUrls: ['./orders-search-product.component.scss'],
})
export class OrdersSearchProductComponent
  extends HelperTablePage<Product>
  implements OnInit
{
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

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  confirm() {
    if (this.product) {
      this.facade.onSelectProduct(this.product);
      this.close();
    }
  }

  selectProduct(product: Product) {
    this.product = product;
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  isSelected(product: Product) {
    return this.product && this.product.id === product.id;
  }

  onImageError(event: ErrorEvent) {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/no-image.png';
  }

  /**
   * Getters
   */

  get busy(): boolean {
    return this.facade.apiProducts.busy.value;
  }

  get products(): Product[] {
    return this.facade.apiProducts.products.value ?? [];
  }

  get canSave(): boolean {
    return this.product !== null && (this.quantity.value ?? 0) > 0;
  }

  get priceAtStore(): number {
    return (
      this.product?.ProductLocationPrice?.find(
        (price) => price.LocationId === '1'
      )?.Price ?? 0
    );
  }

  /**
   * Life Cicle
   */
  ngOnInit() {
    this.facade.fetchProducts('');
  }
}
