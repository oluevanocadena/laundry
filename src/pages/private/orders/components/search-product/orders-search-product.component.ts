import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { Product } from '@bussiness/products/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { HelperTablePage } from '@components/common/helper.table.page';
import { FormProp } from '@type/form.type';

@Component({
  selector: 'orders-search-product',
  standalone: false,
  templateUrl: './orders-search-product.component.html',
  styleUrls: ['./orders-search-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    public facade: OrdersDraftFacade,
    public sessionService: SessionService,
    public cdr: ChangeDetectorRef
  ) {
    super();
  }

  /**
   * UI Events
   */

  confirm() {
    if (this.product) {
      this.facade.onSelectProduct(this.product);
      this.cdr.detectChanges();
      this.close();
    }
  }

  selectProduct(product: Product) {
    this.product = product;
    this.cdr.detectChanges();
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  isSelected(product: Product) {
    return this.product && this.product.id === product.id;
  }

  getPriceAtStore(product: Product): number {
    const locationId = this.sessionService.SessionInfo.value?.Location?.id;
    console.log('🚀 locationId', locationId);
    console.log('🚀 ProductLproductocationPrice', product);
    const productPrice = product?.ProductLocationPrice?.find(
      (price) => price.LocationId === locationId
    );
    console.log('🚀 productPrice', productPrice);
    return productPrice?.Price ?? 0;
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
    return (
      this.facade.apiProducts.products.value?.filter((product) =>
        product.ProductLocationPrice?.find(
          (price) =>
            price.LocationId ===
            this.sessionService.SessionInfo.value?.Location?.id
        )
      ) ?? []
    );
  }

  get canSave(): boolean {
    return this.product !== null && (this.quantity.value ?? 0) > 0;
  }

  /**
   * Life Cicle
   */
  ngOnInit() {
    this.facade.fetchProducts('');
  }
}
