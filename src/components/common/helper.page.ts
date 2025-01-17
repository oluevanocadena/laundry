import { Component, HostListener, inject, OnInit } from '@angular/core';
import { routes } from '../../app/routes';
import moment from 'moment';
import { BrowserService } from '../../services/common/browser.service';
import { system } from '../../environments/environment';

@Component({
  template: '<ng-content></ng-content>',
  styles: [''],
})
export class HelperPage {
  routes = routes;
  //Environment
  system = system;
  isMobile: boolean = false;
  isMobileOrTablet: boolean = false;
  isDesktopOrLaptop: boolean = false;
  isDesktopOrLargeDesktop: boolean = false;
  isLargeDesktop: boolean = false;

  isAppleDevice: boolean = false;

  public today = moment().format('YYYY-MM-DD');

  public widthWindow: number = 0;
  public heightWindow: number = 0;

  private _lastWidth: number = 0;
  private browserService = inject(BrowserService);
  constructor() {
    if (this.browserService.isBrowser()) {
      this.widthWindow = window.innerWidth;
      this.heightWindow = window.innerHeight;
      this.evaluateWidthDevice();
      this.checkDevice();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.widthWindow = event.target.innerWidth;
    this.heightWindow = event.target.innerHeight;
    this.evaluateWidthDevice();
  }

  public checkDevice() {
    if (this.browserService.isBrowser()) {
      // Detecta Safari en iOS
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

      // Detecta específicamente Safari (excluye Chrome y otros navegadores)
      const isSafari =
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
        !/(Chrome|CriOS|FxiOS|Edge)/.test(navigator.userAgent);

      this.isAppleDevice = isIOS && isSafari;
    }
  }

  public evaluateWidthDevice() {
    let width = this.widthWindow;
    if (this._lastWidth === width) return;
    this.isMobile = width <= 430;
    this.isMobileOrTablet = width < 769;
    this.isDesktopOrLaptop = width >= 769 && width < 1024;
    this.isDesktopOrLargeDesktop = width > 1024;
    this.isLargeDesktop = width > 1366;
    this._lastWidth = width;
  }
}
