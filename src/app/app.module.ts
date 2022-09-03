import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { environment } from '../environments/environment';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
// import 'materialize-css';
// import { MaterializeModule } from 'angular2-materialize';
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider,
// } from 'angularx-social-login';
// import { StorageModule } from '@ngx-pwa/local-storage';
import { InterceptorService } from './services/_helpers/interceptor.service';
// import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
// import { AngularFileUploaderModule } from 'angular-file-uploader';
// import { MarketPlaceComponentModule } from './pages/market-place/market-place.component.module';
import { ChatListComponentModule } from './pages/chat-list/chat-list.component.module';
import { AuthGuard } from './services/authguards/auth.guard';
import { MessagingService } from './shared/messaging.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgOtpInputModule } from 'ng-otp-input';
// import { TagInputModule } from 'ngx-chips';
import { Camera } from '@ionic-native/camera/ngx';
// import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';
import { OrderCardComponent } from './pages/consumer/consumer-dashboard/order-card/order-card.component';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
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
    //   apiKey: 'AIzaSyBMJa73RYD3-HOwR9ndGWS3SxH9mp4qkJA',
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
