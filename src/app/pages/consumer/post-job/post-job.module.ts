import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostJobPageRoutingModule } from './post-job-routing.module';

import { PostJobPage } from './post-job.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { OrderSummaryComponent } from '../order-summary-old/order-summary.component';
import { DriverInstructionsModule } from '../components/driver-instructions/driver-instructions.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostJobPageRoutingModule,
    LayoutsModule,
    DatePickerModule,
    LayoutsModule,
    DriverInstructionsModule,
    // HeaderComponent,
  ],
  declarations: [PostJobPage, OrderSummaryComponent],
})
export class PostJobPageModule {}
