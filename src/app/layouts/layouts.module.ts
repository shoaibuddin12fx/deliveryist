import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingPageModule } from '../pages/setting/setting.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, IonicModule, RouterModule, SettingPageModule],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutsModule {}
