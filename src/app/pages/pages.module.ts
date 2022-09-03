import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
// import { LayoutsModule } from '../layouts/layouts.module';
import { UserSelectionScreenComponent } from './user-selection-screen/user-selection-screen.component';
import { ConsumerDashboardComponent } from './consumer/consumer-dashboard/consumer-dashboard.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IntroductionScreensComponent } from './introduction-screens/introduction-screens.component';
import 'materialize-css';
// import { MaterializeModule } from 'angular2-materialize';
import { PostJobComponent } from './consumer/post-job/post-job.component';
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
import { JobListComponent } from './driver/job-list/job-list.component';
import { DriverRatingsReviewsComponent } from './driver/driver-ratings-reviews/driver-ratings-reviews.component';
import { TrackPackageComponent } from './driver/track-package/track-package.component';
import { DriverSettingsComponent } from './driver/driver-settings/driver-settings.component';
import { ChatListComponentModule } from './chat-list/chat-list.component.module';
import { VehicleDetailComponent } from './driver/vehicle-detail/vehicle-detail.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { DeliveryHistoryComponent } from './driver/delivery-history/delivery-history.component';
import { OrderHistoryComponent } from './consumer/order-history/order-history.component';
import { CardDetailComponent } from './consumer/card-detail/card-detail.component';
import { OrderSummaryComponent } from './consumer/order-summary/order-summary.component';
import { AddPhotoComponent } from './driver/add-photo/add-photo.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { PhoneMaskDirective } from '../shared/pipe/phone-mask.directive';
import { WalletComponent } from './driver/wallet/wallet.component';
import { EarningComponent } from './driver/earning/earning.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagingService } from '../shared/messaging.service';
// import { TagInputModule } from 'ngx-chips';
import { IonicModule } from '@ionic/angular';
import { ProfilePicSelectionComponent } from './market-place/components/ProfilePicSelection/profile-pic-selection.component';
// import { AgmCoreModule } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';
import { CalendarModule } from 'ion2-calendar';
import { OrderCardComponent } from './consumer/consumer-dashboard/order-card/order-card.component';
import { JobFilterComponent } from './driver/driver-dashboard/job-filter/job-filter.component';
import { DeliveryCompletedComponent } from './driver/delivery-completed/delivery-completed.component';
import { MarketPlaceComponent } from './market-place/market-place.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    UserSelectionScreenComponent,
    ConsumerDashboardComponent,
    DriverDashboardComponent,
    IntroductionScreensComponent,
    PostJobComponent,
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
    JobListComponent,
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
    OrderCardComponent,
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
