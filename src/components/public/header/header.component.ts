import { Component, OnInit } from '@angular/core';
import { routes } from '../../../app/routes';

@Component({
  selector: 'public-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routes = routes;

  constructor() {}

  ngOnInit() {}
}
