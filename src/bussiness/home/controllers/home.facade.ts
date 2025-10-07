import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from '@app/routes';

import { ILocationsRepository } from '@bussiness/locations/repository/locations.repository';
import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { SessionInfo } from '@bussiness/session/interfaces/session.interface';
import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';

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
    public repoLocations: ILocationsRepository,
    public ordersDraftFacade: OrdersDraftFacade,
    public router: Router,
  ) {
    super(api);
  }

  override initialize(): void {
    super.initialize();
    this.validateRoute();
    if (this.locations.value?.length === 0) {
      this.repoLocations.getAll().then((response) => {
        this.locations.value = response.data ?? [];
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
