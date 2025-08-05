import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperPage } from '../helper.page';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent extends HelperPage {
  //form
  form = new FormGroup({
    search: new FormControl(''),
  });

  // Properties
  @Input() title: string = '';

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  /**
   * Lifecycle
   */
  ngOnInit() {}
}
