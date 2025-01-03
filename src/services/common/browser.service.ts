import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getScreenSize() {
    if (this.isBrowser()) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return { width: 0, height: 0 };
  }
}
