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
    { id: 1, label: 'Logout' },
  ];

  constructor() {}

  /**
   * Getters
   */
  get name() {
    return 'Oscar Luevano';
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}

export interface UIOptionProfileMenu {
  id: number;
  label: string;
}
