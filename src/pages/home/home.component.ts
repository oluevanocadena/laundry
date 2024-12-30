import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../components/common/helper.page';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends HelperPage {
  constructor() {
    super();
  }

  ngOnInit() {}
}
