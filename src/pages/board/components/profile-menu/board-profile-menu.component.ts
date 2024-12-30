import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'board-profile-menu',
  standalone: false,
  templateUrl: './board-profile-menu.component.html',
  styleUrls: ['./board-profile-menu.component.scss'],
})
export class BoardProfileMenuComponent implements OnInit {
  //Flag Management
  show: boolean = false;

  //Arrays
  options: UIOptionProfileMenu[] = [
    { id: 1, label: 'Profile' },
    { id: 1, label: 'Logout' },
    { id: 1, label: 'About' },
  ];

  constructor() {}

  ngOnInit() {}
}

export interface UIOptionProfileMenu {
  id: number;
  label: string;
}
