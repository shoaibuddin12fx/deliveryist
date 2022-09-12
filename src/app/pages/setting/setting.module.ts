import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SettingHeaderModule } from './setting-header/setting-header.module';
import { EarningComponent } from '../driver/earning-old/earning.component';
import { ConsumerNotificationComponent } from '../consumer/consumer-notification-old/consumer-notification.component';
import { ProfileComponent } from '../profile/profile.component';
import { WalletComponent } from '../driver/wallet-old/wallet.component';
import { PolicyComponent } from '../payment-old/policy.component';
import { HelpComponent } from '../help-old/help.component';
import { ReportIssueComponent } from '../report-issue-old/report-issue.component';
import { OrderHistoryModule } from '../consumer/order-history-old/order-history.module';
import { OrderHistoryComponent } from '../consumer/order-history-old/order-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    SettingHeaderModule,
    OrderHistoryModule,
  ],
  declarations: [
    SettingPage,
    EarningComponent,
    ConsumerNotificationComponent,
    ProfileComponent,
    WalletComponent,
    PolicyComponent,
    HelpComponent,
    ReportIssueComponent,
    OrderHistoryComponent,
  ],
})
export class SettingPageModule {}
