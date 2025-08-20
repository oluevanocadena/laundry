import { Component, OnInit } from "@angular/core";
import { HomeFacade } from "@bussiness/home/controllers/home.facade";

@Component({
  selector: "top-bar-organization",
  standalone: false,
  templateUrl: "./top-bar-organization.component.html",
  styleUrls: ["./top-bar-organization.component.scss"]
})

export class TopBarOrganizationComponent implements OnInit {
  
  constructor(public facade: HomeFacade) { 
    
  }

  ngOnInit() {
    this.facade.initialize();
  }
}
