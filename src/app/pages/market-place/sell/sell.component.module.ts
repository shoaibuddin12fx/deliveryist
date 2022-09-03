import { SellComponent } from './sell.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { MaterializeModule } from 'angular2-materialize';


@NgModule({
    declarations: [
        SellComponent
    ],
    exports: [
        SellComponent
    ],
    imports: [
        CommonModule,
        LayoutsModule,
        ReactiveFormsModule,
        // MaterializeModule,
    ],
    providers: [
    ]
})
export class SellComponentModule { }
