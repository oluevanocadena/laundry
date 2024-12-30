import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'board-drawer-notications',
  standalone: false,
  templateUrl: './drawer-notications.component.html',
  styleUrls: ['./drawer-notications.component.scss'],
})
export class DrawerNoticationsComponent extends HelperPage {
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
    { id: 1, label: 'Lorem Ipsum', readed: true },
    { id: 2, label: 'Lorem Ipsum', readed: true },
    { id: 3, label: 'Lorem Ipsum', readed: true },
    { id: 4, label: 'Lorem Ipsum', readed: true },
    { id: 5, label: 'Lorem Ipsum', readed: true },
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
