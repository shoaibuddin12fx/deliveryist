import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyToJobPageRoutingModule } from './apply-to-job-routing.module';

import { ApplyToJobPage } from './apply-to-job.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyToJobPageRoutingModule,
    LayoutsModule,
  ],
  declarations: [ApplyToJobPage],
})
export class ApplyToJobPageModule {}
