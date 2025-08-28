import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { HelperPage } from '../helper.page';
import { HomeFacade } from '@bussiness/home/controllers/home.facade';
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

 
  constructor(public facade: HomeFacade) {
    super();
  }
 
  /**
   * UI Events
   */
 

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
  }
}

export interface IBoardDrawerMenuComponent {
  id: number;
  label: string;
  show?: boolean;
  url?: string;
}
