import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRoleSelectionPageRoutingModule } from './user-role-selection-routing.module';

import { UserRoleSelectionPage } from './user-role-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRoleSelectionPageRoutingModule
  ],
  declarations: [UserRoleSelectionPage]
})
export class UserRoleSelectionPageModule {}
