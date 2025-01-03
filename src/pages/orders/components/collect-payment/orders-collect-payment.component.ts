import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'orders-collect-payment',
  standalone: false,
  templateUrl: './orders-collect-payment.component.html',
  styleUrls: ['./orders-collect-payment.component.scss'],
})
export class OrdersCollectPaymentComponent extends HelperPage {

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public nzModalService: NzModalService,
  ) {
    super();
  }

  /**
   * Ui Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
