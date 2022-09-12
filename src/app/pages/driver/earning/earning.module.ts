import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EarningPageRoutingModule } from './earning-routing.module';

import { EarningPage } from './earning.page';
import { SettingHeaderModule } from '../../setting/setting-header/setting-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EarningPageRoutingModule,
    SettingHeaderModule,
  ],
  declarations: [EarningPage],
})
export class EarningPageModule {}
