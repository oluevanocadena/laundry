import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent extends HelperPage {
  

  // Properties
  @Input() title: string = '';
  @Output() onTabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    super();
  }

  /**
   * UI Events
   */


  onChangeTab(index: number) {
    this.onTabChange.emit(index);
  }

  /**
   * Lifecycle
   */
  ngOnInit() {}
}
