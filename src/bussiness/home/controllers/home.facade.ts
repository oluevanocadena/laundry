import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from '@app/routes';

import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { Location } from '@bussiness/locations/locations.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { SessionInfo } from '@bussiness/session/session.interface';
import { UISelectOption } from '@components/form-input/form-input.component';
import { FacadeBase } from '../../../globals/types/facade.base';
import { FormProp } from '../../../globals/types/form.type';
import { SubjectProp } from '../../../globals/types/subject.type';

const routesNotAllowed = [routes.OrderDraft, routes.OrderDetails];

@Injectable({
  providedIn: 'root',
})
export class HomeFacade extends FacadeBase {
  formGroup = new FormGroup({
    period: new FormControl('1'),
  });

  periods: UISelectOption[] = [
    {
      id: '1',
      Name: 'Últimos 60 minutos',
    },
  ];

  period = new FormProp(this.formGroup, 'period', '1');
  locations = new SubjectProp<Location[]>([]);

  canChangeLocation = true;

  constructor(
    public sessionService: SessionService,
    public api: SessionApiService,
    public apiLocations: LocationsApiService,
    public ordersDraftFacade: OrdersDraftFacade,
    public router: Router
  ) {
    super(api);
  }

  override initialize(): void {
    super.initialize();
    this.validateRoute();
    if (this.locations.value?.length === 0) {
      this.apiLocations.getLocations().then((locations) => {
        console.log('👉🏽 locations', locations);
        this.locations.value = locations;
      });
    }
  }

  bindEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.validateRoute();
      }
    });
  }

  clearState(): void {}

  submitForm(): void {}

  /**
   * UI Events
   */

  validateRoute() {
    console.log('👉🏽 router.url', this.router.url);
    this.canChangeLocation = !routesNotAllowed.includes(this.router.url);
  }

  onLocationClick(location: Location) {
    this.sessionService.sessionInfo.value = {
      ...this.sessionService.sessionInfo.value,
      Location: location,
    } as SessionInfo;
  }

  /**
   * Getters
   */

  get organizationName() {
    return this.sessionService.sessionInfo.value?.Account.Organization?.Name;
  }

  get defaultLocation() {
    return this.sessionService.sessionInfo.value?.Location?.Name;
  }

  get currentLocationId() {
    return this.sessionService.sessionInfo.value?.Location?.id;
  }
}
