import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackPackagePage } from './track-package.page';

const routes: Routes = [
  {
    path: '',
    component: TrackPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackPackagePageRoutingModule {}
