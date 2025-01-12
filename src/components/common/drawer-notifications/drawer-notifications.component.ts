import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'drawer-notifications',
  standalone: false,
  templateUrl: './drawer-notifications.component.html',
  styleUrls: ['./drawer-notifications.component.scss'],
})
export class DrawerNotificationsComponent extends HelperPage {
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
  notifications: INotifications[] = [
    { id: 1, label: 'Lorem Ipsum', readed: false },
    { id: 2, label: 'Lorem Ipsum', readed: false },
    { id: 3, label: 'Lorem Ipsum', readed: false },
    { id: 4, label: 'Lorem Ipsum', readed: true },
    { id: 5, label: 'Lorem Ipsum', readed: true },
    { id: 6, label: 'Lorem Ipsum', readed: true },
    { id: 7, label: 'Lorem Ipsum', readed: true },
    { id: 8, label: 'Lorem Ipsum', readed: true },
  ];

  constructor() {
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
  ngOnInit() {}
}

export interface INotifications {
  id: number;
  label: string;
  readed?: boolean;
  url?: string;
}
