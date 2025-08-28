import { Component, OnInit } from "@angular/core";
import { HomeFacade } from "@bussiness/home/controllers/home.facade";
import { HelperPage } from "../helper.page";

@Component({
  selector: "top-bar-organization",
  standalone: false,
  templateUrl: "./top-bar-organization.component.html",
  styleUrls: ["./top-bar-organization.component.scss"]
})

export class TopBarOrganizationComponent extends HelperPage implements OnInit  {
  
  constructor(public facade: HomeFacade) { 
    super();
  }

  ngOnInit() {
    this.facade.initialize();
  }
}
