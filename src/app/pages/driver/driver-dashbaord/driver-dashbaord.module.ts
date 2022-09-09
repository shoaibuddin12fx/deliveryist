import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverDashbaordPageRoutingModule } from './driver-dashbaord-routing.module';

import { DriverDashbaordPage } from './driver-dashbaord.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverDashbaordPageRoutingModule,
    LayoutsModule,
  ],
  declarations: [DriverDashbaordPage],
})
export class DriverDashbaordPageModule {}
