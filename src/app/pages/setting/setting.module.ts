import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SettingHeaderModule } from './setting-header/setting-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    SettingHeaderModule,
  ],
  declarations: [SettingPage],
})
export class SettingPageModule {}
