import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerRoutingModule } from './consumer-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { OrderHistoryModule } from './order-history-old/order-history.module';
import { OrderHistoryPageModule } from './order-history/order-history.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsumerRoutingModule,
    LayoutsModule,
    OrderHistoryModule,
    OrderHistoryPageModule,
  ],
})
export class ConsumerModule {}
