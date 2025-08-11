import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookiesService } from '../../../services/common/cookie.service';
import { FacadeBase } from '../../../types/facade.base';
import { StorageProp } from '../../../types/storage.type';
import { Session } from '../../session/session.interface';
import { LocationsApiService } from '../locations.api.service';
import { Location } from '../locations.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocationsDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisableModal: boolean = false;

  public formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl({ value: 'México', disabled: true }),
    externalNumber: new FormControl(''),
    internalNumber: new FormControl(''),
    municipality: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    default: new FormControl(true),
  });

  //Subjects
  public selectedLocation = new StorageProp<Location>(null, 'LOCATION_EDITION');

  constructor(
    public api: LocationsApiService,
    public cookiesService: CookiesService<Session>
  ) {
    super(api);
  }

  initialize() {}

  bindEvents() {}

  clearState() {
    Object.keys(this.formGroup.controls).forEach((key) => {
      const control = this.formGroup.get(key);
      control?.setValue(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.selectedLocation.value = null;
    this.edition = false;
    this.formGroup.controls.default.patchValue(true);
    this.formGroup.controls.country.patchValue('México');
    this.formGroup.controls.country.disable();
  }

  /**
   * API
   */

  submitForm() {
    const value = this.formGroup.value;
    const location: Location = {
      id: this.edition ? this.selectedLocation.value?.id : undefined,
      Name: value.name?.toString() || '',
      Phone: value.phone?.toString() || '',
      Country: this.selectedLocation.value?.Country || 'México',
      ExtNumber: value.externalNumber?.toString() || '',
      IntNumber: value.internalNumber?.toString() || '',
      Neighborhood: value.neighborhood?.toString() || '',
      Municipality: value.municipality?.toString() || '',
      State: value.state?.toString() || '',
      Street: value.street?.toString() || '',
      ZipCode: value.zipCode?.toString() || '',
      Default: this.selectedLocation.value?.Default || value.default || false,
      OrganizationId: this.cookiesService.UserInfo.Organization.id,
    };
    console.log('🤔 location', location);
    return this.api.saveLocation(location);
  }

  disableLocation(id: string, disabled: boolean) {
    return this.api.disableLocation(id, disabled).then(() => {
      if (this.selectedLocation.value) {
        this.selectedLocation.value.Disabled =
          !this.selectedLocation.value.Disabled;
      }
    });
  }

  deleteLocation(id: string) {
    return this.api.deleteLocation(id).then(() => {
      if (this.selectedLocation.value) {
        this.selectedLocation.value.Deleted = true;
      }
    });
  }

  /**
   * Methods
   */

  fillForm() {
    const value = this.selectedLocation.value;
    if (value) {
      this.edition = true;
      this.formGroup.patchValue({
        default: value.Default,
        name: value.Name,
        phone: value.Phone,
        country: value.Country,
        externalNumber: value.ExtNumber,
        internalNumber: value.IntNumber,
        neighborhood: value.Neighborhood,
        municipality: value.Municipality,
        state: value.State,
        street: value.Street,
        zipCode: value.ZipCode,
      });
    } else {
      console.log('🤔 clearState');
      this.clearState();
    }
  }
}
