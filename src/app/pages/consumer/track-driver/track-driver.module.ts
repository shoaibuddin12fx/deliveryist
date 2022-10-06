import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackDriverPageRoutingModule } from './track-driver-routing.module';

import { TrackDriverPage } from './track-driver.page';
import { TrackMapComponent } from './track-map/track-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackDriverPageRoutingModule,
  ],
  declarations: [TrackDriverPage, TrackMapComponent],
})
export class TrackDriverPageModule {}
