import { MarketPlaceComponentModule } from './market-place/market-place.component.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
// import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { IntroductionScreensComponent } from './introduction-screens/introduction-screens.component';
import { TrackDriverComponent } from './consumer/track-driver-old/track-driver.component';
import { PaymentModeComponent } from './consumer/payment-mode/payment-mode.component';
import { RatingsAndReviewsComponent } from './consumer/ratings-and-reviews/ratings-and-reviews.component';
import { SettingsComponent } from './consumer/settings/settings.component';
import { AuthGuard } from '../services/authguards/auth.guard';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ChatListComponent } from './chat-list/chat-list.component';
// import { ChatPageRoutingModule } from './chat-list/chat-list-routing.module';
import { ChatListComponentModule } from './chat-list/chat-list.component.module';
import { ProfileComponent } from './profile-old/profile.component';
import { AboutComponent } from './about/about.component';
import { PolicyComponent } from './payment-old/policy.component';
import { HelpComponent } from './help-old/help.component';
import { ConsumerNotificationComponent } from './consumer/consumer-notification-old/consumer-notification.component';
import { DriverNotificationComponent } from './driver/driver-notification/driver-notification.component';
import { ContactComponent } from './contact/contact.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ApplyToJobComponent } from './driver/apply-to-job-old/apply-to-job.component';
import { DriverRatingsReviewsComponent } from './driver/driver-ratings-reviews/driver-ratings-reviews.component';
import { TrackPackageComponent } from './driver/track-package-old/track-package.component';
import { DriverSettingsComponent } from './driver/driver-settings/driver-settings.component';
import { VehicleDetailComponent } from './driver/vehicle-detail-old/vehicle-detail.component';
import { ReportIssueComponent } from './report-issue-old/report-issue.component';
import { DeliveryHistoryComponent } from './driver/delivery-history/delivery-history.component';
import { OrderHistoryComponent } from './consumer/order-history-old/order-history.component';
import { CardDetailComponent } from './consumer/card-detail/card-detail.component';
import { OrderSummaryComponent } from './consumer/order-summary-old/order-summary.component';
import { AddPhotoComponent } from './driver/add-photo-old/add-photo.component';
import { WalletComponent } from './driver/wallet-old/wallet.component';
import { EarningComponent } from './driver/earning-old/earning.component';
import { DeliveryCompletedComponent } from './driver/delivery-completed-old/delivery-completed.component';
import { DriverInstructionsComponent } from './consumer/components/driver-instructions/driver-instructions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash-screen/splash-screen.module').then(
        (m) => m.SplashScreenPageModule
      ),
  },
  { path: 'introductionScreen', component: IntroductionScreensComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./authentication/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'user-role-selection',
    loadChildren: () =>
      import('./user-role-selection/user-role-selection.module').then(
        (m) => m.UserRoleSelectionPageModule
      ),
  },

  {
    path: 'apply-to-job/:id',
    loadChildren: () =>
      import('./driver/apply-to-job/apply-to-job.module').then(
        (m) => m.ApplyToJobPageModule
      ),
  },
  {
    path: 'consumer',
    loadChildren: () =>
      import('./consumer/consumer.module').then((m) => m.ConsumerModule),
  },

  {
    path: 'post-job',
    loadChildren: () =>
      import('./consumer/post-job/post-job.module').then(
        (m) => m.PostJobPageModule
      ),
  },

  {
    path: 'driver-dashboard',
    loadChildren: () =>
      import('./driver/driver-dashbaord/driver-dashbaord.module').then(
        (m) => m.DriverDashbaordPageModule
      ),
  },

  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then((m) => m.DriverModule),
  },
  {
    path: 'track-package/:id',
    loadChildren: () =>
      import('./driver/track-package/track-package.module').then(
        (m) => m.TrackPackagePageModule
      ),
  },

  {
    path: 'delivery-completed',
    loadChildren: () =>
      import('./driver/delivery-completed/delivery-completed.module').then(
        (m) => m.DeliveryCompletedPageModule
      ),
  },

  {
    path: 'notification',
    loadChildren: () =>
      import('./consumer/notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },

  {
    path: 'wallet',
    loadChildren: () =>
      import('./driver/wallet/wallet.module').then((m) => m.WalletPageModule),
  },

  {
    path: 'earning',
    loadChildren: () =>
      import('./driver/earning/earning.module').then(
        (m) => m.EarningPageModule
      ),
  },

  {
    path: 'order-history',
    loadChildren: () =>
      import('./consumer/order-history/order-history.module').then(
        (m) => m.OrderHistoryPageModule
      ),
  },

  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
  },

  {
    path: 'help',
    loadChildren: () =>
      import('./help-page/help-page.module').then((m) => m.HelpPagePageModule),
  },

  {
    path: 'report-issue',
    loadChildren: () =>
      import('./report-issue/report-issue.module').then(
        (m) => m.ReportIssuePageModule
      ),
  },

  {
    path: 'add-photo',
    loadChildren: () =>
      import('./driver/add-photo/add-photo.module').then(
        (m) => m.AddPhotoPageModule
      ),
  },
  // {
  //   path: 'openInstruction',
  //   loadChildren: () =>
  //     import(
  //       './consumer/components/driver-instructions/driver-instructions.module'
  //     ).then((m) => m.DriverInstructionsModule),
  // },
  {
    path: 'vehicle-detail',
    loadChildren: () =>
      import('./driver/vehicle-detail/vehicle-detail.module').then(
        (m) => m.VehicleDetailPageModule
      ),
  },

  {
    path: 'track-driver',
    loadChildren: () =>
      import('./consumer/track-driver/track-driver.module').then(
        (m) => m.TrackDriverPageModule
      ),
  },

  { path: 'forgetPassword', component: ForgetPasswordComponent },
  // { path: 'driverDashboard', component: DriverDashboardComponent },
  // { path: 'deliveryCompleted', component: DeliveryCompletedComponent },
  // { path: 'trackDriver', component: TrackDriverComponent },
  { path: 'paymentMode', component: PaymentModeComponent },
  { path: 'reviews', component: RatingsAndReviewsComponent },
  { path: 'settings', component: SettingsComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'viewProfile', component: ViewProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'help', component: HelpComponent },
  { path: 'consumerNotification', component: ConsumerNotificationComponent },
  { path: 'driverNotification', component: DriverNotificationComponent },
  { path: 'applyToJob', component: ApplyToJobComponent },
  { path: 'driverReviews', component: DriverRatingsReviewsComponent },
  { path: 'trackPackage', component: TrackPackageComponent },
  { path: 'driverNotification', component: DriverNotificationComponent },
  { path: 'driverSetting', component: DriverSettingsComponent },
  { path: 'addPhoto', component: AddPhotoComponent },
  { path: 'myVehicle', component: VehicleDetailComponent },
  { path: 'reportIssue', component: ReportIssueComponent },
  { path: 'deliveryHistory', component: DeliveryHistoryComponent },
  { path: 'orderHistory', component: OrderHistoryComponent },
  { path: 'cardDetails', component: CardDetailComponent },
  { path: 'orderSummary', component: OrderSummaryComponent },
  {
    path: 'marketplace',
    component: MarketPlaceComponent,
    canActivate: [AuthGuard],
  },
  { path: 'chat', component: ChatListComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'earning', component: EarningComponent },

  // {
  //   path: 'autocomplete',
  //   loadChildren: () => import('./autocomplete/autocomplete.module').then( m => m.AutocompletePageModule)
  // },
  {
    path: 'autocomplete',
    loadChildren: () =>
      import('../components/autocomplete/autocomplete.module').then(
        (m) => m.AutocompletePageModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },

  // {
  //   path: 'order-detail',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
