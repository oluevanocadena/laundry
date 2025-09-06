import { Component, OnInit } from "@angular/core";
import { ReportsFacade } from "@bussiness/reports/controllers/reports.facade";
import { HelperPage } from "@components/common/helper.page";

@Component({
  selector: 'page-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})

export class ReportsPageComponent extends HelperPage implements OnInit {
  
  constructor(public facade: ReportsFacade) { 
    super();
  }

  ngOnInit() {
    this.facade.fetchStatistics();
  }
}
