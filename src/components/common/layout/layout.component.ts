import { Component } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

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
