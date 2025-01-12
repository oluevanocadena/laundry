import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'menu-content',
  standalone: false,
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
})
export class MenuContentComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;

  constructor() {
    super();
  }

  ngOnInit() {}
}
