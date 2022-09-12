import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportIssuePageRoutingModule } from './report-issue-routing.module';

import { ReportIssuePage } from './report-issue.page';
import { SettingHeaderModule } from '../setting/setting-header/setting-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportIssuePageRoutingModule,
    SettingHeaderModule,
  ],
  declarations: [ReportIssuePage],
})
export class ReportIssuePageModule {}
