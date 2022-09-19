import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { DriverApiService } from 'src/app/services/driver-api.service';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
})
export class OtpModalComponent extends BasePage implements OnInit {
  _track;
  constructor(private driverApiService: DriverApiService, injector: Injector) {
    super(injector);
  }

  @Input() set track(value) {
    this._track = value;
    console.log(value);
  }

  get track() {
    return this._track;
  }
  security_code;
  ngOnInit() {}

  verifySecurityToken() {
    if (this.track.security_code == this.security_code) {
      let jobData: any = {
        job_id: this.track.job_id,
        status: 'Delivered',
        latitude: this.track.destination.lat,
        longitude: this.track.destination.lng,
      };

      this.driverApiService
        .packageStatusChange(jobData)
        .then((res) => {
          console.log(res);
          let reqData = {
            job_id: parseInt(this.track.job_id),
            amount: this.track.jobAmount,
          };
          this.driverApiService.setAmountInWallet(reqData).then((res) => {
            this.navigateTo('pages/delivery-completed/');
            this.modals.dismiss();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // this.security_code = '';
      // M.toast({ html: 'Security code incorrect', classe s: 'dlvr-error-toast' })
    }
  }
}
