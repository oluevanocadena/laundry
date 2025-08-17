import { Component, OnInit, Input } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'customers-top-bar',
  standalone: false,
  templateUrl: './customers-top-bar.component.html',
  styleUrls: ['./customers-top-bar.component.scss'],
})
export class CustomersTopBarComponent extends HelperPage implements OnInit {
  @Input() loading: boolean = false;
  @Input() title: string = 'Customers';
  

  constructor() {
    super();
  }

  ngOnInit() {}
}
