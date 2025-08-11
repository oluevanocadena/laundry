import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'logo',
  standalone: false,
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent extends HelperPage implements OnInit {
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() size: 'small' | 'medium' | 'large' = 'small';

  constructor() {
    super();
  }

  ngOnInit() {}
}
