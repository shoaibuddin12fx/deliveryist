import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverDashbaordPage } from './driver-dashbaord.page';

const routes: Routes = [
  {
    path: '',
    component: DriverDashbaordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverDashbaordPageRoutingModule {}
