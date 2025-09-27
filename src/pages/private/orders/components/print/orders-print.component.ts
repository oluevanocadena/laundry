import { Component, EventEmitter, Input, Output } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { PaymentMethodsEnum } from '@bussiness/orders/enums/order.payment.enums';
import { SessionService } from '@bussiness/session/services/session.service';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-print',
  standalone: false,
  templateUrl: './orders-print.component.html',
  styleUrls: ['./orders-print.component.scss'],
})
export class OrdersPrintComponent extends HelperPage {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  constructor(public facade: OrdersDraftFacade, public sessionService: SessionService) {
    super();
  }

  /**
   * Ui events
   */
  printTicket() {
    console.log('printTicket');
    const printContents = document.getElementById('ticket-content')?.innerHTML;
    if (!printContents) return;

    const win = window.open('', '_blank', 'width=800,height=600');
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Ticket</title>
            <link rel="stylesheet" href="styles.css">
            <style>
              @font-face {
                font-family: 'Ticketing';
                src: url('/assets/fonts/ticketing.ttf') format('truetype');
              }
              @page {
                size: 80mm auto; /* ancho fijo de ticket */
                margin: 0;
              }
              body {
                font-family: 'Ticketing', monospace;
                font-size: 14px;
                width: 80mm;
                margin: 0 auto; 
                padding: 0;
                white-space: pre-wrap;
              }
              .ticket {
                width: 80mm; 
                font-family: 'Ticketing', monospace;
                font-size: 14px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContents}
          </body>
        </html>
      `);
      win.document.close();
      this.close();
    }
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
    this.onClose.emit();
  }

  /**
   * Getters
   */

  get employeeName() {
    return this.facade.order.value?.CreatedBy ?? '';
  }

  get orderTotals() {
    return this.facade.orderTotals.value;
  }

  get orderItems() {
    return this.facade.orderItems.value;
  }

  get customer() {
    return this.facade.orderCustomer.value;
  }

  get order() {
    return this.facade.order.value;
  }

  get organization() {
    return this.sessionService.sessionInfo.value?.Account.Organization;
  }

  get paymentMethod() {
    switch (this.facade.order.value?.PaymentMethod) {
      case PaymentMethodsEnum.Cash:
        return 'Efectivo';
      case PaymentMethodsEnum.Card:
        return 'Tarjeta de crédito o débito';
      case PaymentMethodsEnum.CashOnDelivery:
        return 'Contra-entrega';
      default:
        return 'Método de pago no especificado';
    }
  }

  get currentLocation() {
    return this.sessionService.sessionInfo.value?.Location;
  }
}
