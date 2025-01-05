import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, finalize, firstValueFrom } from 'rxjs';
import { HelperTablePage } from '../../../../components/common/helper.table.page';
import {
  OrderItemsStatus,
  OrderItemsStatusEnum,
  OrdersStatusService,
  OrderStatus,
} from '../../../../services/order-status.service';
import { OrderItem } from '../../../../services/orders.service';
import {
  ProductCategory,
  ProductCategoryEnum,
  ProductCategoryService,
} from '../../../../services/product-category.service';
import { Product, ProductService } from '../../../../services/products.service';
import {
  CustomerSettings,
  SettingsService,
} from '../../../../services/settings.services';

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
  //Flag Maganement
  loading: boolean = false;

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTabChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onSelectItem: EventEmitter<OrderItem | null> =
    new EventEmitter<OrderItem | null>();

  //formGroup
  formGroup = new FormGroup({
    product: new FormControl(null, [Validators.required]),
    weight: new FormControl<number | null>(null, [Validators.required]),
    ironing: new FormControl<number | null>(null, [Validators.required]),
    search: new FormControl(''),
    selectedDryCleaningProduct: new FormControl<Product | null>(null),
    selectedOtherProduct: new FormControl<Product | null>(null),
  });

  //Arrays
  categories: ProductCategory[] = [];
  products: Product[] = [];
  orderStatuses: OrderStatus[] = [];
  orderItemsStatuses: OrderItemsStatus[] = [];

  //Models
  selectedCategory: ProductCategory | null = null;
  customerSettings: CustomerSettings | null = null;

  //Enums
  prodCatEnum = ProductCategoryEnum;

  //Index
  tabIndex: number = 0;

  constructor(
    public nzMessageService: NzMessageService,
    public nzModalService: NzModalService,
    public ordersStatusService: OrdersStatusService,
    public productCategoryService: ProductCategoryService,
    public productService: ProductService,
    public settingsService: SettingsService
  ) {
    super();
    this.pageSize = 10;
  }

  /**
   * API Calls
   */
  async load(): Promise<void> {
    try {
      this.loading = true;
      this.categories = await firstValueFrom(
        this.productCategoryService.getCategoriesFake()
      );
      this.customerSettings = await firstValueFrom(
        this.settingsService.getSettingsFake(1)
      );

      this.orderStatuses = await firstValueFrom(
        this.ordersStatusService.getFakeOrderStatuses()
      );
      this.orderItemsStatuses = await firstValueFrom(
        this.ordersStatusService.getFakeOrderItemsStatuses()
      );

      this.selectedCategory = this.categories[0];
      await this.searchProducts();
    } catch (error) {
      console.error(error);
      this.nzMessageService.error('Error loading data');
    } finally {
      this.loading = false;
    }
  }

  searchProducts() {
    this.loading = true;
    this.productService
      .getProductsFake(
        this.page,
        this.pageSize,
        this.search,
        this.selectedCategory?.id ?? 0
      )
      .pipe(
        catchError((error) => {
          this.nzMessageService.error('Error loading products');
          return [];
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((products) => {
        this.clearSelectedProduct();
        this.products = products;
        console.log('products', products);
      });
  }

  /**
   * Ui Events
   */

  onChangeTab(index: any) {
    this.onTabChange.emit(index);
    this.selectedCategory = this.categories[index];
    console.log(index, this.selectedCategory);
    setTimeout(() => {
      this.formGroup.controls['search'].patchValue('');
      this.searchProducts();
    });
  }

  addProduct() {
    let orderItem: OrderItem | null = null;

    switch (this.tabIndex) {
      case 0:
        orderItem = {
          status:
            this.orderItemsStatuses.find((x) => x.name == 'Not Proccesed')
              ?.name ?? '',
          statusId: OrderItemsStatusEnum.NotProccesed,
          categoryId: this.selectedCategory?.id ?? 0,
          category: this.selectedCategory?.name ?? '',
          name: this.selectedCategory?.name ?? '',
          productId: this.selectedCategory?.id ?? 0,
          quantity: this.weight ?? 0,
          price: this.customerSettings?.products.laundryKgPrice ?? 0,
          tax: this.taxtOfLaundry,
          subtotal: this.totalLaundry - this.taxtOfLaundry,
          total: this.totalLaundry,
          isDeliveryFee: false,
          id: 0,
        };
        break;
      case 1:
        orderItem = {
          status:
            this.orderItemsStatuses.find((x) => x.name == 'Not Proccesed')
              ?.name ?? '',
          statusId: OrderItemsStatusEnum.NotProccesed,
          categoryId: this.selectedCategory?.id ?? 0,
          category: this.selectedCategory?.name ?? '',
          name: this.selectedDryCleaningProduct?.name ?? '',
          productId: this.selectedDryCleaningProduct?.id ?? 0,
          quantity: 1,
          price: this.priceOfSelectedDryCleaningProduct,
          tax: this.taxtOfSelectedDryCleaningProduct,
          subtotal: this.subTotalOfSelectedDryCleaningProduct,
          total: this.priceOfSelectedDryCleaningProduct,
          isDeliveryFee: false,
          id: 0,
        };
        break;
      case 2:
        orderItem = {
          status:
            this.orderItemsStatuses.find((x) => x.name == 'Not Proccesed')
              ?.name ?? '',
          statusId: OrderItemsStatusEnum.NotProccesed,
          categoryId: this.selectedCategory?.id ?? 0,
          category: this.selectedCategory?.name ?? '',
          name: this.selectedCategory?.name ?? '',
          productId: this.selectedCategory?.id ?? 0,
          quantity: this.ironing ?? 0,
          price: this.customerSettings?.products.ironingPiecePrice ?? 0,
          tax: this.taxtOfIroning,
          subtotal: this.totalIroning - this.taxtOfIroning,
          total: this.totalIroning,
          isDeliveryFee: false,
          id: 0,
        };
        break;
      case 3:
        orderItem = {
          status:
            this.orderItemsStatuses.find((x) => x.name == 'Not Proccesed')
              ?.name ?? '',
          statusId: OrderItemsStatusEnum.NotProccesed,
          categoryId: this.selectedCategory?.id ?? 0,
          category: this.selectedCategory?.name ?? '',
          name: this.selectedOtherProduct?.name ?? '',
          productId: this.selectedOtherProduct?.id ?? 0,
          quantity: 1,
          price: this.priceOfSelectedOtherProduct,
          tax: this.taxOfSelectedOtherProduct,
          subtotal: this.subTotalOfSelectedOtherProduct,
          total: this.priceOfSelectedOtherProduct,
          isDeliveryFee: false,
          id: 0,
        };
        break;
      default:
        orderItem;
    }
    this.onSelectItem.emit(orderItem);
    this.reset();
    this.close();
  }

  clearSelectedProduct() {
    if (this.tabIndex == 1) {
      this.formGroup.controls['selectedDryCleaningProduct'].setValue(null);
    }
    if (this.tabIndex == 3) {
      this.formGroup.controls['selectedOtherProduct'].setValue(null);
    }
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  reset() {
    this.formGroup.reset();
  }

  /**
   * Getters
   */

  get selectedOtherProduct() {
    return this.formGroup.get('selectedOtherProduct')?.value;
  }

  get selectedDryCleaningProduct() {
    return this.formGroup.get('selectedDryCleaningProduct')?.value;
  }

  get canSave() {
    let result = false;
    switch (this.tabIndex) {
      case 0:
        result = this.weight != null && this.weight > 0;
        break;
      case 1:
        result = this.selectedDryCleaningProduct != null;
        break;
      case 2:
        result = this.ironing != null && this.ironing > 0;
        break;
      case 3:
        result = this.selectedOtherProduct != null;
        break;
      default:
        result;
    }
    return result;
  }

  get search() {
    return this.formGroup.get('search')?.value || '';
  }

  get weight() {
    return this.formGroup.get('weight')?.value;
  }

  get ironing() {
    return this.formGroup.get('ironing')?.value;
  }

  get totalLaundry() {
    let total = 0;
    let price = this.customerSettings?.products.laundryKgPrice ?? 0;
    if (this.weight) {
      total = this.weight * price;
    }
    return total;
  }

  get totalIroning() {
    let total = 0;
    let price = this.customerSettings?.products.ironingPiecePrice ?? 0;
    if (this.ironing) {
      total = this.ironing * price;
    }
    return total;
  }

  get taxtOfLaundry() {
    let total = 0;
    let price = this.customerSettings?.products.laundryKgPrice ?? 0;
    total = price * (this.customerSettings?.taxes.taxRate ?? 0);
    return total;
  }

  get taxtOfIroning() {
    let total = 0;
    let price = this.customerSettings?.products.ironingPiecePrice ?? 0;
    total = price * (this.customerSettings?.taxes.taxRate ?? 0);
    return total;
  }

  get taxtOfSelectedDryCleaningProduct() {
    let total = 0;
    let price = this.selectedDryCleaningProduct?.price ?? 0;
    total = price * (this.customerSettings?.taxes.taxRate ?? 0);
    return total;
  }

  get subTotalOfSelectedDryCleaningProduct() {
    let total = 0;
    let price = this.selectedDryCleaningProduct?.price ?? 0;
    total = price - this.taxtOfSelectedDryCleaningProduct;
    return total;
  }

  get priceOfSelectedDryCleaningProduct() {
    return this.selectedDryCleaningProduct?.price ?? 0;
  }

  get taxOfSelectedOtherProduct() {
    let total = 0;
    let price = this.selectedOtherProduct?.price ?? 0;
    total = price * (this.customerSettings?.taxes.taxRate ?? 0);
    return total;
  }

  get subTotalOfSelectedOtherProduct() {
    let total = 0;
    let price = this.selectedOtherProduct?.price ?? 0;
    total = price - this.taxOfSelectedOtherProduct;
    return total;
  }

  get priceOfSelectedOtherProduct() {
    return this.selectedOtherProduct?.price ?? 0;
  }

  /**
   * Life Cicle
   */
  ngOnInit() {
    this.load();
  }
}
