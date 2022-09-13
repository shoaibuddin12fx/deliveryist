import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPhotoPageRoutingModule } from './add-photo-routing.module';

import { AddPhotoPage } from './add-photo.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPhotoPageRoutingModule,
    LayoutsModule,
  ],
  declarations: [AddPhotoPage],
})
export class AddPhotoPageModule {}
