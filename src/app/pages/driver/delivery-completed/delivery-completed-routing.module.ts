import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryCompletedPage } from './delivery-completed.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryCompletedPageRoutingModule {}
