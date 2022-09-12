import { Component, Injector, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
// import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.scss'],
})
export class EarningComponent extends BasePage implements OnInit {
  earningsData;
  walletType = 'today';
  totalEarning;
  ratings = 0;
  completed_job = 0;
  tabView;
  todayTab;
  weeklyTab;
  monthlyTab;
  yearlyTab;
  constructor(private driverService: DriverApiService, injector: Injector) {
    super(injector);
    this.changeRecordsType('today');
    this.getEarnings();
  }

  ngOnInit() {
    this.tabView = document.querySelectorAll('.tabs');
    // M.Tabs.init(this.tabView, { dismissible: true });
  }

  async getEarnings() {
    const resp = await this.driverService.getEarnings(this.walletType);
    if (resp) {
      this.totalEarning = resp['total'];
      this.earningsData = resp['earnings'];
      this.ratings = resp['rating'];
      this.completed_job = resp['completed_jobs'];
    }
    console.log(resp);
  }

  changeRecordsType(type) {
    this.walletType = type;
    switch (this.walletType) {
      case 'today':
        this.todayTab = true;
        this.weeklyTab = false;
        this.monthlyTab = false;
        this.yearlyTab = false;
        break;

      case 'weekly':
        this.todayTab = false;
        this.weeklyTab = true;
        this.monthlyTab = false;
        this.yearlyTab = false;
        break;

      case 'monthly':
        this.todayTab = false;
        this.weeklyTab = false;
        this.monthlyTab = true;
        this.yearlyTab = false;
        break;

      case 'yearly':
        this.todayTab = false;
        this.weeklyTab = false;
        this.monthlyTab = false;
        this.yearlyTab = true;
        break;

      default:
        this.todayTab = true;
    }
    this.getEarnings();
  }
}
