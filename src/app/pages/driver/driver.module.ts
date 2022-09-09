import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverDashbaordPageModule } from './driver-dashbaord/driver-dashbaord.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ApplyToJobPageModule } from './apply-to-job/apply-to-job.module';
import { TrackPackagePageModule } from './track-package/track-package.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DriverRoutingModule,
    DriverDashbaordPageModule,
    LayoutsModule,
    ApplyToJobPageModule,
    TrackPackagePageModule,
  ],
})
export class DriverModule {}
