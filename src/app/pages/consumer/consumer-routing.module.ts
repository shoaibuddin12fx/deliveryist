import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'post-job',
    pathMatch: 'full',
  },
  {
    path: 'consumer-dashboard',
    loadChildren: () =>
      import('./consumer-dashboard/consumer-dashboard.module').then(
        (m) => m.ConsumerDashboardPageModule
      ),
  },
  {
    path: 'post-job',
    loadChildren: () =>
      import('./post-job/post-job.module').then((m) => m.PostJobPageModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./order-history/order-history.module').then(
        (m) => m.OrderHistoryPageModule
      ),
  },
  {
    path: 'track-driver',
    loadChildren: () => import('./track-driver/track-driver.module').then( m => m.TrackDriverPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  // {
  //   path: 'order-summary',
  //   loadChildren: () => import('./order-summary/order-summary.module').then( m => m.OrderSummaryPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerRoutingModule {}
