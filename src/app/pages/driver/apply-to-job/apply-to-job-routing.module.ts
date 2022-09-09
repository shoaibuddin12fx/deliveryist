import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyToJobPage } from './apply-to-job.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyToJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyToJobPageRoutingModule {}
