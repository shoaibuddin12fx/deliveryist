import { ChatListComponent } from './chat-list.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MaterializeModule } from 'angular2-materialize';
// import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/app/services/_helpers/interceptor.service';
import { ChatPageRoutingModule } from './chat-list-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ListComponent } from './list/list.component';

@NgModule({
  entryComponents: [

  ],
  declarations: [
    ChatListComponent,
    ChatComponent,
    ListComponent
  ],
  exports: [
    ChatListComponent,
  ],
  imports: [
    CommonModule,
    ChatPageRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
    // MaterializeModule,
    // NgxPubSubModule,
  ],
  providers: [

  ],
})
export class ChatListComponentModule { }
