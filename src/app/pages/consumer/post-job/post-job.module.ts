import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostJobPageRoutingModule } from './post-job-routing.module';

import { PostJobPage } from './post-job.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostJobPageRoutingModule,
    LayoutsModule,
    DatePickerModule,
  ],
  declarations: [PostJobPage],
})
export class PostJobPageModule {}
