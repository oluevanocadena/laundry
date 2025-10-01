import { Component, OnInit } from '@angular/core';
import { routes } from '@app/routes';

@Component({
  selector: 'store-menu',
  standalone: false,
  templateUrl: './store-menu.component.html',
  styleUrls: ['./store-menu.component.scss'],
})
export class StoreMenuComponent implements OnInit {
  routes = routes;

  constructor() {}

  ngOnInit() {}
}
