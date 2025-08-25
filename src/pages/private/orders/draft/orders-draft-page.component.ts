import { Component, HostListener, OnInit } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-orders-draft-page',
  standalone: false,
  templateUrl: './orders-draft-page.component.html',
  styleUrls: ['./orders-draft-page.component.scss'],
})
export class OrdersDraftPageComponent
  extends HelperPage
  implements OnInit, CanDeactivate<OrdersDraftPageComponent>
{
  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent) {
    if (this.facade.canExit === false) {
      $event.preventDefault();
      $event.returnValue = '';
    }
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.facade.initialize();
  }

  canDeactivate(): boolean {
    console.log(this.facade.canExit);
    if (this.facade.canExit === false) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
    }
    return true;
  }
}
