import { MarketPlaceComponentModule } from './market-place/market-place.component.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { UserSelectionScreenComponent } from './user-selection-screen/user-selection-screen.component';
import { ConsumerDashboardComponent } from './consumer/consumer-dashboard/consumer-dashboard.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { IntroductionScreensComponent } from './introduction-screens/introduction-screens.component';
import { TrackDriverComponent } from './consumer/track-driver/track-driver.component';
import { PaymentModeComponent } from './consumer/payment-mode/payment-mode.component';
import { RatingsAndReviewsComponent } from './consumer/ratings-and-reviews/ratings-and-reviews.component';
import { SettingsComponent } from './consumer/settings/settings.component';
import { AuthGuard } from '../services/authguards/auth.guard';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ChatListComponent } from './chat-list/chat-list.component';
// import { ChatPageRoutingModule } from './chat-list/chat-list-routing.module';
import { ChatListComponentModule } from './chat-list/chat-list.component.module';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { PolicyComponent } from './policy/policy.component';
import { HelpComponent } from './help/help.component';
import { ConsumerNotificationComponent } from './consumer/consumer-notification/consumer-notification.component';
import { DriverNotificationComponent } from './driver/driver-notification/driver-notification.component';
import { ContactComponent } from './contact/contact.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ApplyToJobComponent } from './driver/apply-to-job/apply-to-job.component';
import { JobListComponent } from './driver/job-list/job-list.component';
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
import { WalletComponent } from './driver/wallet/wallet.component';
import { EarningComponent } from './driver/earning/earning.component';
import { DeliveryCompletedComponent } from './driver/delivery-completed/delivery-completed.component';

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
      import(
        './authentication/user-role-selection/user-role-selection.module'
      ).then((m) => m.UserRoleSelectionPageModule),
  },
  {
    path: 'post-job',
    loadChildren: () =>
      import('./consumer/post-job/post-job.module').then(
        (m) => m.PostJobPageModule
      ),
  },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'driverDashboard', component: DriverDashboardComponent },
  {
    path: 'userRoleSelection',
    component: UserSelectionScreenComponent,
    canActivate: [AuthGuard],
  },
  { path: 'consumerDashboard', component: ConsumerDashboardComponent },
  { path: 'deliveryCompleted', component: DeliveryCompletedComponent },
  { path: 'trackDriver', component: TrackDriverComponent },
  { path: 'paymentMode', component: PaymentModeComponent },
  { path: 'reviews', component: RatingsAndReviewsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'viewProfile', component: ViewProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'help', component: HelpComponent },
  { path: 'consumerNotification', component: ConsumerNotificationComponent },
  { path: 'driverNotification', component: DriverNotificationComponent },
  { path: 'applyToJob', component: ApplyToJobComponent },
  { path: 'jobList', component: JobListComponent },
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
      import('./authentication/autocomplete/autocomplete.module').then(
        (m) => m.AutocompletePageModule
      ),
  },
  {
    path: 'user-role-selection',
    loadChildren: () => import('./user-role-selection/user-role-selection.module').then( m => m.UserRoleSelectionPageModule)
  },

  // {
  //   path: 'order-detail',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ChatListComponentModule],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
