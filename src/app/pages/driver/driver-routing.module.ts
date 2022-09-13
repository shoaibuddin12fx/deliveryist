import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'driver-dashbaord',
    pathMatch: 'full',
  },
  {
    path: 'job-list',
    loadChildren: () =>
      import('./job-list/job-list.module').then((m) => m.JobListPageModule),
  },
  {
    path: 'driver-dashbaord',
    loadChildren: () =>
      import('./driver-dashbaord/driver-dashbaord.module').then(
        (m) => m.DriverDashbaordPageModule
      ),
  },
  {
    path: 'apply-to-job/:id',
    loadChildren: () =>
      import('./apply-to-job/apply-to-job.module').then(
        (m) => m.ApplyToJobPageModule
      ),
  },
  {
    path: 'track-package/:id',
    loadChildren: () =>
      import('./track-package/track-package.module').then(
        (m) => m.TrackPackagePageModule
      ),
  },
  {
    path: 'delivery-completed/:id',
    loadChildren: () =>
      import('./delivery-completed/delivery-completed.module').then(
        (m) => m.DeliveryCompletedPageModule
      ),
  },  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'earning',
    loadChildren: () => import('./earning/earning.module').then( m => m.EarningPageModule)
  },
  {
    path: 'add-photo',
    loadChildren: () => import('./add-photo/add-photo.module').then( m => m.AddPhotoPageModule)
  },
  {
    path: 'vehicle-detail',
    loadChildren: () => import('./vehicle-detail/vehicle-detail.module').then( m => m.VehicleDetailPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {}
