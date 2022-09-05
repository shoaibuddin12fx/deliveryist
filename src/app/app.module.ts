import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { InterceptorService } from './services/_helpers/interceptor.service';
import { ChatListComponentModule } from './pages/chat-list/chat-list.component.module';
import { MessagingService } from './shared/messaging.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgOtpInputModule } from 'ng-otp-input';
// import { TagInputModule } from 'ngx-chips';
import { Camera } from '@ionic-native/camera/ngx';
// import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    AppRoutingModule,
    HttpClientModule,
    // NgxPubSubModule,
    // MaterializeModule,
    // StorageModule.forRoot({ IDBNoWrap: true }),
    // NgxPubSubModule,
    // AngularFileUploaderModule,
    ChatListComponentModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    // MaterializeModule,
    // TagInputModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'L',
    //   libraries: ['places'],
    // }),
    // AgmDirectionModule,
  ],
  providers: [
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    Geolocation,
    // NativeGeocoder,
    MessagingService,
    NgxImageCompressService,
    NgxSpinnerService,
    // GoogleMapsAPIWrapper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
