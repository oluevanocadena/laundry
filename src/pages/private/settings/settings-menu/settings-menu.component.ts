import { Component, OnInit } from '@angular/core';
import { routes } from '@app/routes';

@Component({
  selector: 'settings-menu',
  standalone: false,
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent implements OnInit {

  routes = routes;
  constructor () {}

  ngOnInit() {}
}
