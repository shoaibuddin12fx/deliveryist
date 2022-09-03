import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AgmDirectionModule } from 'agm-direction';
import { MaterializeModule } from 'angular2-materialize';
import { OrderDetailModule } from './order-detail/order-detail.module';

@NgModule({
  imports: [
    AgmCoreModule,
    AgmDirectionModule,
    MaterializeModule,
    OrderDetailModule,
  ],
  declarations: [],
  providers: [],
})
export class TrackPackageModule {}
