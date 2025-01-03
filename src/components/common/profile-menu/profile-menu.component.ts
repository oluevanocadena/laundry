import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-menu',
  standalone: false,
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  //Flag Management
  show: boolean = false;

  //Arrays
  options: UIOptionProfileMenu[] = [
    { id: 1, label: 'Profile' },
    { id: 1, label: 'Settings' },
    { id: 1, label: 'About' },
    { id: 1, label: 'Logout' },
  ];

  constructor() {}

  ngOnInit() {}
}

export interface UIOptionProfileMenu {
  id: number;
  label: string;
}
