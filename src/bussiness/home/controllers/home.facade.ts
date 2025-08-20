import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { Location } from '@bussiness/locations/locations.interfaces';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';
import { SessionService } from '@bussiness/session/services/session.service';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { SessionInfo } from '@bussiness/session/session.interface';
import { UISelectOption } from '@components/form-input/form-input.component';
import { FacadeBase } from '@type/facade.base';
import { FormProp } from '@type/form.type';

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

  constructor(
    public sessionService: SessionService,
    public api: SessionApiService,
    public apiLocations: LocationsApiService
  ) {
    super(api);
  }

  override initialize(): void {
    super.initialize();
    this.apiLocations.getLocations();
  }

  bindEvents(): void {}

  clearState(): void {}

  submitForm(): void {}

  /**
   * UI Events
   */

  onLocationClick(location: Location) {
    this.sessionService.SessionInfo.value = {
      ...this.sessionService.SessionInfo.value,
      Location: location,
    } as SessionInfo;
  }

  /**
   * Getters
   */

  get organizationName() {
    return this.sessionService.SessionInfo.value?.Account.Organization?.Name;
  }

  get defaultLocation() {
    return this.sessionService.SessionInfo.value?.Location?.Name;
  }

  get currentLocationId() {
    return this.sessionService.SessionInfo.value?.Location?.id;
  }
}
