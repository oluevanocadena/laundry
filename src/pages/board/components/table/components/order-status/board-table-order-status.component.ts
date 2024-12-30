import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "board-table-order-status",
  standalone: false,
  templateUrl: "./board-table-order-status.component.html",
  styleUrls: ["./board-table-order-status.component.scss"]
})

export class BoardTableOrderStatusComponent implements OnInit {

  @Input() status: string = "";
  
  constructor() { 

  }

  ngOnInit() {

  }
}
