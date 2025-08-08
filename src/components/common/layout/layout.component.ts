import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends HelperPage {
  constructor() {
    super();
  }

  ngOnInit() {}
}
