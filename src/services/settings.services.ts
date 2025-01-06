import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public settings = new BehaviorSubject<CustomerSettings | null>(null);
  private settingsLoaded = false;

  constructor(public http: HttpService) {}

  getSettings(customerId: string) {
    return this.http.get<CustomerSettings>(`settings/${customerId}`);
  }

  // Obtener settings con cache
  initSettings(customerId: string): Observable<CustomerSettings> {
    // Si ya tenemos settings, retornarlos del cache
    if (this.settingsLoaded && this.settings.value) {
      return this.settings.asObservable().pipe(map((settings) => settings!));
    }
    // Si no hay settings, cargarlos del backend
    return this.loadSettings(customerId);
  }

  // Cargar settings del backend
  private loadSettings(customerId: string): Observable<CustomerSettings> {
    return this.getSettingsFake(customerId).pipe(
      tap((settings) => {
        this.settings.next(settings);
        this.settingsLoaded = true;
      })
    );
  }

  // Forzar recarga de settings
  refreshSettings(customerId: string): Observable<CustomerSettings> {
    this.settingsLoaded = false;
    return this.loadSettings(customerId);
  }

  /**
   * Fakes
   */
  getSettingsFake(customerId: string): Observable<CustomerSettings> {
    return new Observable<CustomerSettings>((observer) => {
      observer.next(fakeSettings);
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

export const fakeSettings: CustomerSettings = {
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
};
