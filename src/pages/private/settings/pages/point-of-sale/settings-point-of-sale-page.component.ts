import { Component, OnInit } from "@angular/core";
import { HelperPage } from "@components/common/helper.page";

@Component({
  selector: "settings-point-of-sale-page",
  standalone: false,
  templateUrl: "./settings-point-of-sale-page.component.html",
  styleUrls: ["./settings-point-of-sale-page.component.scss"]
})

export class SettingsPointOfSalePageComponent extends HelperPage implements OnInit {
  
  constructor() {
    super();

  }

  ngOnInit() {

  }
}
