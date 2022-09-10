import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
})
export class OtpModalComponent extends BasePage implements OnInit {
  _track;
  constructor(injector: Injector) {
    super(injector);
  }

  @Input() set track(value) {
    this._track = value;
  }

  get track() {
    return this._track;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('====================================');
      console.log('OTP DATA', this.track);
      console.log('====================================');
    }, 1000);
  }
}
