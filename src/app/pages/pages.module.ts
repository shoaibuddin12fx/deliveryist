import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { IntroductionScreensComponent } from './introduction-screens/introduction-screens.component';
import 'materialize-css';
// import { MaterializeModule } from 'angular2-materialize';
import { TrackDriverComponent } from './consumer/track-driver/track-driver.component';
import { PaymentModeComponent } from './consumer/payment-mode/payment-mode.component';
import { RatingsAndReviewsComponent } from './consumer/ratings-and-reviews/ratings-and-reviews.component';
import { SettingsComponent } from './consumer/settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { PolicyComponent } from './policy/policy.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DriverNotificationComponent } from './driver/driver-notification/driver-notification.component';
import { ConsumerNotificationComponent } from './consumer/consumer-notification/consumer-notification.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ApplyToJobComponent } from './driver/apply-to-job/apply-to-job.component';
import { DriverRatingsReviewsComponent } from './driver/driver-ratings-reviews/driver-ratings-reviews.component';
import { TrackPackageComponent } from './driver/track-package/track-package.component';
import { DriverSettingsComponent } from './driver/driver-settings/driver-settings.component';
import { VehicleDetailComponent } from './driver/vehicle-detail/vehicle-detail.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { DeliveryHistoryComponent } from './driver/delivery-history/delivery-history.component';
import { OrderHistoryComponent } from './consumer/order-history/order-history.component';
import { CardDetailComponent } from './consumer/card-detail/card-detail.component';
import { OrderSummaryComponent } from './consumer/order-summary/order-summary.component';
import { AddPhotoComponent } from './driver/add-photo/add-photo.component';
import { PhoneMaskDirective } from '../shared/pipe/phone-mask.directive';
import { WalletComponent } from './driver/wallet/wallet.component';
import { EarningComponent } from './driver/earning/earning.component';
import { MessagingService } from '../shared/messaging.service';
// import { TagInputModule } from 'ngx-chips';
import { IonicModule } from '@ionic/angular';
import { ProfilePicSelectionComponent } from './market-place/components/ProfilePicSelection/profile-pic-selection.component';
// import { AgmCoreModule } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';
import { CalendarModule } from 'ion2-calendar';
import { JobFilterComponent } from './driver/driver-dashboard/job-filter/job-filter.component';
import { DeliveryCompletedComponent } from './driver/delivery-completed/delivery-completed.component';
import { MarketPlaceComponent } from './market-place/market-place.component';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    DriverDashboardComponent,
    IntroductionScreensComponent,
    TrackDriverComponent,
    PaymentModeComponent,
    RatingsAndReviewsComponent,
    SettingsComponent,
    DeliveryCompletedComponent,
    ProfileComponent,
    HelpComponent,
    PolicyComponent,
    AboutComponent,
    ContactComponent,
    DriverNotificationComponent,
    ConsumerNotificationComponent,
    ViewProfileComponent,
    ApplyToJobComponent,
    DriverRatingsReviewsComponent,
    TrackPackageComponent,
    DriverSettingsComponent,
    VehicleDetailComponent,
    ReportIssueComponent,
    DeliveryHistoryComponent,
    OrderHistoryComponent,
    CardDetailComponent,
    OrderSummaryComponent,
    AddPhotoComponent,
    PhoneMaskDirective,
    WalletComponent,
    EarningComponent,
    ProfilePicSelectionComponent,
    JobFilterComponent,
    MarketPlaceComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    // LayoutsModule,
    // ReactiveFormsModule,
    // MaterializeModule,
    // ChatListComponentModule,
    // ReactiveFormsModule,
    // FormsModule,
    // NgOtpInputModule,
    // HttpClientModule,
    // TagInputModule,
    IonicModule,
    // // AgmCoreModule,
    // // AgmDirectionModule,
    // CalendarModule,
  ],
  providers: [MessagingService],
  exports: [PhoneMaskDirective],
})
export class PagesModule {}