import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderCardComponent } from './order-card.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [OrderCardComponent],
  exports: [OrderCardComponent]
})
export class OrderCardModule {}
