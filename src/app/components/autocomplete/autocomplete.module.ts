import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutocompletePageRoutingModule } from './autocomplete-routing.module';

import { AutocompletePage } from './autocomplete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutocompletePageRoutingModule
  ],
  declarations: [AutocompletePage]
})
export class AutocompletePageModule {}
