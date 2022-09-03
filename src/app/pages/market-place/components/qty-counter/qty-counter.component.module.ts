import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
// import { MaterializeModule } from 'angular2-materialize';
import { QtyCounterComponent } from './qty-counter.component';

@NgModule({

    declarations: [
        QtyCounterComponent,
    ],
    exports: [
        QtyCounterComponent,
    ],
    imports: [
        CommonModule,
        LayoutsModule,
        // MaterializeModule,
    ],
    providers: [
    ]
})
export class QtyCounterComponentsModule { }
