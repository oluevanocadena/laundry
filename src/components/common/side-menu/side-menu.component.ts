import { Component, OnInit } from "@angular/core";
import { HelperPage } from "../helper.page";

@Component({
  selector: "side-menu",
  standalone: false,
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})

export class SideMenuComponent extends HelperPage implements OnInit {

  //Flag Management
  collapsed: boolean = false;
  
  constructor() { 
    super();
  }

  ngOnInit() {

  }
}
