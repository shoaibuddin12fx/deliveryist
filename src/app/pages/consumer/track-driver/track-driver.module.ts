import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackDriverPageRoutingModule } from './track-driver-routing.module';

import { TrackDriverPage } from './track-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackDriverPageRoutingModule
  ],
  declarations: [TrackDriverPage]
})
export class TrackDriverPageModule {}
