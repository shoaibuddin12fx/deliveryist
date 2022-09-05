import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'job-list',
    pathMatch: 'full',
  },
  {
    path: 'job-list',
    loadChildren: () =>
      import('./job-list/job-list.module').then(
        (m) => m.JobListPageModule
      ),
  },


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerRoutingModule {}
