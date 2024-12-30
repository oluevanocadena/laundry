import { Component, Input, OnInit } from "@angular/core";
import { HelperPage } from "../../../../../../components/common/helper.page";

@Component({
  selector: "board-table-due-date",
  standalone: false,
  templateUrl: "./board-table-due-date.component.html",
  styleUrls: ["./board-table-due-date.component.scss"]
})

export class BoardTableDueDateComponent extends HelperPage implements OnInit {

  @Input() date: string = "";
  @Input() time: string = "";
  @Input() status: string = "";
  
  constructor() { 
    super();
  }

  ngOnInit() {

  }
}
