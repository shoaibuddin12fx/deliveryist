import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SettingHeaderModule } from './setting-header/setting-header.module';
import { EarningComponent } from '../driver/earning/earning.component';
import { ConsumerNotificationComponent } from '../consumer/consumer-notification/consumer-notification.component';
import { ProfileComponent } from '../profile/profile.component';
import { WalletComponent } from '../driver/wallet/wallet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    SettingHeaderModule,
  ],
  declarations: [
    SettingPage,
    EarningComponent,
    ConsumerNotificationComponent,
    ProfileComponent,
    WalletComponent,
  ],
})
export class SettingPageModule {}
