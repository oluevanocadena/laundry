import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { HelperPage } from '../helper.page';
@Component({
  selector: 'drawer-menu-options',
  standalone: false,
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss'],
})
export class DrawerMenuComponent extends HelperPage {
  

  //Flag Management

  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Arrays
  menuOptions: IBoardDrawerMenuComponent[] = [
    { id: 1, label: 'Customer', show: true },
    { id: 2, label: 'Products', show: true },
    { id: 3, label: 'Orders', show: true },
    { id: 4, label: 'Notifications', show: false },
    { id: 5, label: 'Settings', show: true },
  ];

  constructor() {
    super();
  }

  @HostListener('window:resize', ['$event'])
  override onResize(event: UIEvent): void {
    this.validateOptions();
    super.onResize(event);
  }

  /**
   * UI Events
   */

  validateOptions() {
    if (this.isMobile === false) {
      const hiddenOptions = new Set([3, 4, 5]);
      this.menuOptions.forEach((option) => {
        option.show = !hiddenOptions.has(option.id);
      });
    }
  }

  openShortMenu() {
    this.show = true;
    this.showChange.emit(this.show);
  }

  closeShortMenu() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Life Cycle
   */
  ngOnInit() {
    this.validateOptions();
  }
}

export interface IBoardDrawerMenuComponent {
  id: number;
  label: string;
  show?: boolean;
  url?: string;
}
