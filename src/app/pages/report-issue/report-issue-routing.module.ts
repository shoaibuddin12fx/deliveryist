import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportIssuePage } from './report-issue.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIssuePageRoutingModule {}
