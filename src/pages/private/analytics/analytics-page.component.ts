import { Component, OnInit } from "@angular/core";
import { AnalyticsFacade } from "@bussiness/analytics/controllers/analytics.facade";
import { HelperPage } from "@components/common/helper.page";

@Component({
  selector: "app-analytics-page",
  standalone: false,
  templateUrl: "./analytics-page.component.html",
  styleUrls: ["./analytics-page.component.scss"]
})

export class AnalyticsPageComponent extends HelperPage implements OnInit {
  
  constructor(public facade: AnalyticsFacade) { 
    super();
  }

  ngOnInit() {
    this.facade.fetchAnalytics();
  }
}
