import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { IntroductionScreensComponent } from './introduction-screens/introduction-screens.component';
import 'materialize-css';
// import { MaterializeModule } from 'angular2-materialize';
import { TrackDriverComponent } from './consumer/track-driver/track-driver.component';
import { PaymentModeComponent } from './consumer/payment-mode/payment-mode.component';
import { RatingsAndReviewsComponent } from './consumer/ratings-and-reviews/ratings-and-reviews.component';
import { SettingsComponent } from './consumer/settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help-old/help.component';
import { PolicyComponent } from './payment-old/policy.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DriverNotificationComponent } from './driver/driver-notification/driver-notification.component';
// import { ConsumerNotificationComponent } from './consumer/consumer-notification/consumer-notification.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ApplyToJobComponent } from './driver/apply-to-job-old/apply-to-job.component';
import { DriverRatingsReviewsComponent } from './driver/driver-ratings-reviews/driver-ratings-reviews.component';
import { TrackPackageComponent } from './driver/track-package-old/track-package.component';
import { DriverSettingsComponent } from './driver/driver-settings/driver-settings.component';
import { VehicleDetailComponent } from './driver/vehicle-detail/vehicle-detail.component';
import { ReportIssueComponent } from './report-issue-old/report-issue.component';
import { DeliveryHistoryComponent } from './driver/delivery-history/delivery-history.component';
import { OrderHistoryComponent } from './consumer/order-history-old/order-history.component';
import { CardDetailComponent } from './consumer/card-detail/card-detail.component';
import { OrderSummaryComponent } from './consumer/order-summary/order-summary.component';
import { AddPhotoComponent } from './driver/add-photo/add-photo.component';
import { PhoneMaskDirective } from '../shared/pipe/phone-mask.directive';
import { WalletComponent } from './driver/wallet-old/wallet.component';
import { EarningComponent } from './driver/earning-old/earning.component';
import { MessagingService } from '../shared/messaging.service';
// import { TagInputModule } from 'ngx-chips';
import { IonicModule } from '@ionic/angular';
import { ProfilePicSelectionComponent } from './market-place/components/ProfilePicSelection/profile-pic-selection.component';
// import { AgmCoreModule } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';
import { CalendarModule } from 'ion2-calendar';
import { JobFilterComponent } from './driver/driver-dashbaord/job-filter/job-filter.component';
import { DeliveryCompletedComponent } from './driver/delivery-completed-old/delivery-completed.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { OrderHistoryPageModule } from './consumer/order-history/order-history.module';
import { ReportIssuePageModule } from './report-issue/report-issue.module';
import { PaymentPageModule } from './payment/payment.module';
import { HelpPagePageModule } from './help-page/help-page.module';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    IntroductionScreensComponent,
    TrackDriverComponent,
    // PaymentModeComponent,
    RatingsAndReviewsComponent,
    SettingsComponent,
    DeliveryCompletedComponent,
    // ProfileComponent,
    // HelpComponent,
    // PolicyComponent,
    AboutComponent,
    ContactComponent,
    DriverNotificationComponent,
    // ConsumerNotificationComponent,
    ViewProfileComponent,
    ApplyToJobComponent,
    DriverRatingsReviewsComponent,
    TrackPackageComponent,
    DriverSettingsComponent,
    VehicleDetailComponent,
    // ReportIssueComponent,
    // DeliveryHistoryComponent,
    // OrderHistoryComponent,
    CardDetailComponent,
    OrderSummaryComponent,
    AddPhotoComponent,
    PhoneMaskDirective,
    // WalletComponent,
    ProfilePicSelectionComponent,
    JobFilterComponent,
    MarketPlaceComponent,
    // ReportIssueComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    OrderHistoryPageModule,
    // ReportIssuePageModule,
    // PaymentPageModule,
    // HelpPagePageModule,
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
