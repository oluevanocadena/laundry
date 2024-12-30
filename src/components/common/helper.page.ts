import { Component, HostListener, OnInit } from '@angular/core';
import { routes } from '../../app/routes';

declare var window: Window;

@Component({
  template: '<ng-content></ng-content>',
  styles: [''],
})
export class HelperPage {
  routes = routes;

  isMobile: boolean = false;
  isMobileOrTablet: boolean = false;
  isDesktopOrLaptop: boolean = false;
  isDesktopOrLargeDesktop: boolean = false;
  isLargeDesktop: boolean = false;

  isAppleDevice: boolean = false;

  // public today = moment().format('YYYY-MM-DD');

  public widthWindow: number = 0;
  public heightWindow: number = 0;

  private _lastWidth: number = 0;

  constructor() {
    if (window) {
      this.widthWindow = window?.innerWidth;
      this.heightWindow = window?.innerHeight;
      this.evaluateWidthDevice(window?.innerWidth);
    }
    this.checkDevice();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.widthWindow = event.target.innerWidth;
    this.heightWindow = event.target.innerHeight;
    this.evaluateWidthDevice(this.widthWindow);
  }

  public checkDevice() {
    const userAgent = window?.navigator.userAgent;
    this.isAppleDevice =
      /iPhone/.test(userAgent) ||
      /iPad/.test(userAgent) ||
      (/Safari/.test(userAgent) &&
        !/Chrome/.test(userAgent) &&
        !/Edge/.test(userAgent));
  }

  public evaluateWidthDevice(width: number) {
    if (this._lastWidth === width) return;
    this.isMobile = width <= 430;
    this.isMobileOrTablet = width < 769;
    this.isDesktopOrLaptop = width >= 769 && width < 1024;
    this.isDesktopOrLargeDesktop = width > 1024;
    this.isLargeDesktop = width > 1366;
    this._lastWidth = width;
  }
}
