import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackPackagePageRoutingModule } from './track-package-routing.module';

import { TrackPackagePage } from './track-package.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { TrackMapComponent } from './track-map/track-map.component';
import { OtpModalComponent } from './otp-modal/otp-modal.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HelpModalComponent } from './help-modal/help-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackPackagePageRoutingModule,
    LayoutsModule,
  ],
  declarations: [
    TrackPackagePage,
    TrackMapComponent,
    OtpModalComponent,
    OrderDetailComponent,
    HelpModalComponent,
  ],
})
export class TrackPackagePageModule {}
