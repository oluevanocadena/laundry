import { Component, Input, input, OnInit } from "@angular/core";
import { HelperPage } from "../../../../../../components/common/helper.page";

@Component({
  selector: "board-table-id",
  standalone: false,
  templateUrl: "./board-table-id.component.html",
  styleUrls: ["./board-table-id.component.scss"]
})

export class BoardTableIdComponent extends HelperPage {

  @Input() id: string = '';
  
  constructor() { 
    super();
  }

  ngOnInit() {

  }
}
