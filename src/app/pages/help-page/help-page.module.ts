import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpPagePageRoutingModule } from './help-page-routing.module';

import { HelpPagePage } from './help-page.page';
import { SettingHeaderModule } from '../setting/setting-header/setting-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPagePageRoutingModule,
    SettingHeaderModule,
  ],
  declarations: [HelpPagePage],
})
export class HelpPagePageModule {}
