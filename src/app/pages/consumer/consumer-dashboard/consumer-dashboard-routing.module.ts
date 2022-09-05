import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumerDashboardPage } from './consumer-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumerDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerDashboardPageRoutingModule {}
