import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryCompletedPageRoutingModule } from './delivery-completed-routing.module';

import { DeliveryCompletedPage } from './delivery-completed.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryCompletedPageRoutingModule,
    LayoutsModule,
  ],
  declarations: [DeliveryCompletedPage],
})
export class DeliveryCompletedPageModule {}
