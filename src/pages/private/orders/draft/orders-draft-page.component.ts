import { Component, HostListener, OnDestroy } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-orders-draft-page',
  standalone: false,
  templateUrl: './orders-draft-page.component.html',
  styleUrls: ['./orders-draft-page.component.scss'],
})
export class OrdersDraftPageComponent extends HelperPage implements CanDeactivate<OrdersDraftPageComponent>, OnDestroy {
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

  canDeactivate(): boolean {
    if (this.facade.canExit === false) {
      const response = confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
      this.facade.clearState();
      return response;
    }
    return true;
  }

  ngAfterViewInit() {
    this.facade.initialize();
  }

  ngOnDestroy(): void {
    this.facade.unbindEvents();
  }
}
