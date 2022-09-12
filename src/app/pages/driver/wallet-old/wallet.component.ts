import { Component, Injector, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
// import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent extends BasePage implements OnInit {
  walletType = 'all';
  walletData = [];
  walletBalance;
  tabView;
  allTab;
  activeTab;
  paidTab;
  constructor(private driverService: DriverApiService, injector: Injector) {
    super(injector);
    this.changeRecordsType('all');
    this.getWalletRecords();
  }

  ngOnInit() {
    this.tabView = document.querySelectorAll('.tabs');
    // M.Tabs.init(this.tabView, { dismissible: true });
  }

  async getWalletRecords() {
    const resp = await this.driverService.getWalletRecords({
      wallet_type: this.walletType,
    });
    if (resp) {
      this.walletBalance = resp['total'];
      this.walletData = resp['wallets'];
    }
  }

  async getPaid() {
    const resp = await this.driverService.getPaid({});
    if (resp) {
      console.log(resp);
    }
  }

  changeRecordsType(type) {
    //active, paid
    this.walletType = type;
    switch (this.walletType) {
      case 'all':
        this.allTab = true;
        this.activeTab = false;
        this.paidTab = false;
        break;

      case 'active':
        this.allTab = false;
        this.activeTab = true;
        this.paidTab = false;
        break;

      case 'paid':
        this.allTab = false;
        this.activeTab = false;
        this.paidTab = true;
        break;

      default:
        this.allTab = true;
    }
    this.getWalletRecords();
  }
}
