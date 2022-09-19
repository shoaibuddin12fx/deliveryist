import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackDriverPage } from './track-driver.page';

const routes: Routes = [
  {
    path: '',
    component: TrackDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackDriverPageRoutingModule {}
