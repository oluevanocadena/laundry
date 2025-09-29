import { Component, OnInit } from '@angular/core';
import { routes } from '@app/routes';

@Component({
  selector: 'plugins-menu',
  standalone: false,
  templateUrl: './plugins-menu.component.html',
  styleUrls: ['./plugins-menu.component.scss'],
})
export class PluginsMenuComponent implements OnInit {
  routes = routes;
  constructor() {}

  ngOnInit() {}
}
