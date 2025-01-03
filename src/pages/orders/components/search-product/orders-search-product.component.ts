import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'orders-search-product',
  standalone: false,
  templateUrl: './orders-search-product.component.html',
  styleUrls: ['./orders-search-product.component.scss'],
})
export class OrdersSearchProductComponent extends HelperPage implements OnInit {
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
  @Output() onSelectProduct: EventEmitter<any> = new EventEmitter<any>();

  //formGroup
  formGroup = new FormGroup({
    product: new FormControl(null, [Validators.required]),
  });

  constructor(
    public nzModalService: NzModalService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * Ui Events
   */

  onChangeTab(index: any) {
    this.onTabChange.emit(index);
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  addProduct() {
    this.nzMessageService.success('Payment collected successfully');
    this.close();
  }

  /**
   * Getters
   */

  get canSave() {
    return this.formGroup.valid;
  }

  ngOnInit() {}
}
