import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConsumerDashboardPageRoutingModule } from './consumer-dashboard-routing.module';
import { ConsumerDashboardPage } from './consumer-dashboard.page';
import { OrderCardModule } from '../components/order-card/order-card.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumerDashboardPageRoutingModule,
    OrderCardModule,
    LayoutsModule
  ],
  declarations: [ConsumerDashboardPage]
})
export class ConsumerDashboardPageModule {}
