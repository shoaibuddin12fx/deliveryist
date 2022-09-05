import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostJobPageRoutingModule } from './post-job-routing.module';

import { PostJobPage } from './post-job.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostJobPageRoutingModule,
    LayoutsModule,

  ],
  declarations: [PostJobPage]
})
export class PostJobPageModule {}
