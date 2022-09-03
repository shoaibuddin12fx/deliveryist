import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRoleSelectionPage } from './user-role-selection.page';

const routes: Routes = [
  {
    path: '',
    component: UserRoleSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoleSelectionPageRoutingModule {}
