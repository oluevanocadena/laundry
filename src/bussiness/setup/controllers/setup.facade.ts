import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { FacadeBase } from '@type/facade.base';

@Injectable({
  providedIn: 'root',
})
export class SetupFacade extends FacadeBase {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  step: number = 0;

  constructor(public api: LocationsApiService) {
    super(api);
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}
}
