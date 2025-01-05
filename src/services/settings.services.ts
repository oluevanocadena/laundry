import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { Observable } from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(public http: HttpService) {}

  getSettings(customerId: number) {
    return this.http.get<CustomerSettings>(`settings/${customerId}`);
  }

  //Fake get
  getSettingsFake(customerId: number): Observable<CustomerSettings> {
    return new Observable<CustomerSettings>((observer) => {
      observer.next({
        id: 1,
        customerId: 1,
        general: {
          currency: 'MXN',
        },
        products: {
          laundryKgPrice: 14.5,
          ironingPiecePrice: 20,
        },
        taxes: {
          taxRate: 0.16,
        },
        delivery: {
          pricePerKm: 20,
        },
      });
    });
  }
}

export interface CustomerSettings {
  id: number;
  customerId: number;
  general: {
    currency: string;
  };
  products: {
    laundryKgPrice: number;
    ironingPiecePrice: number;
  };
  delivery: {
    pricePerKm: number;
  };
  taxes: {
    taxRate: number;
  };
}
