import { Component, OnInit } from "@angular/core";
import { HelperPage } from "../helper.page";

@Component({
  selector: "logo",
  standalone: false,
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})

export class LogoComponent extends HelperPage implements OnInit {
  
  constructor() { 
    super();
  }

  ngOnInit() {

  }
}
