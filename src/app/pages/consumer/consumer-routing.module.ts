import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'post-job',
    pathMatch: 'full',
  },
  {
    path: 'consumer-dashboard',
    loadChildren: () => import('./consumer-dashboard/consumer-dashboard.module').then( m => m.ConsumerDashboardPageModule)
  },
  {
    path: 'post-job',
    loadChildren: () =>
      import('./post-job/post-job.module').then(
        (m) => m.PostJobPageModule
      ),
  },


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerRoutingModule {}
