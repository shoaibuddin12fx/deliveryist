import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';
import 'materialize-css';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  geolocations: any;

  presentToast(msg) {
    return this.alerts.presentToast(msg);
  }

  presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = ''
  ): Promise<boolean> {
    return this.alerts.presentConfirm(
      (okText = okText),
      (cancelText = cancelText),
      (title = title),
      (message = message)
    );
  }
  public loader = false;
  contacts: any;
  constructor(public storage: StorageService, public alerts: AlertsService) {}

  getOnlyDigits(phoneNumber) {
    const numberString = phoneNumber.toString();
    const numberInDigits = numberString.replace(/[^\d]/g, '');
    const numberVal = parseInt(numberInDigits, 10);
    return numberVal.toString();
  }

  onkeyupFormatPhoneNumberRuntime(phoneNumber, last = true) {
    if (phoneNumber == null || phoneNumber == '') {
      return phoneNumber;
    }

    phoneNumber = this.getOnlyDigits(phoneNumber);
    // phoneNumber = phoneNumber.substring(phoneNumber.length - 1,-11);//keep only 10 digit Number
    // phoneNumber = phoneNumber.substring(phoneNumber.length - 10, -11);//keep only 10 digit Number
    phoneNumber = last
      ? phoneNumber.substring(phoneNumber.length - 10, phoneNumber.length)
      : phoneNumber.substring(0, 10);

    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    function numDigits(x: number) {
      return (Math.log(x) * Math.LOG10E + 1) | 0;
    }

    // only keep number and +
    const p1 = cleaned.match(/\d+/g);
    if (p1 == null) {
      return cleaned;
    }
    const p2 = phoneNumber.match(/\d+/g).map(Number);
    const len = numDigits(p2);
    // document.write(len + " " );
    switch (len) {
      case 1:
      case 2:
        return '(' + phoneNumber;
      case 3:
        return '(' + phoneNumber + ')';
      case 4:
      case 5:
      case 6:
        var f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
        var f2 = phoneNumber.toString().substring(len, 3);
        return f1 + ' ' + f2;
      default:
        f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
        f2 = phoneNumber.toString().substring(3, 6);
        var f3 = phoneNumber.toString().substring(6, 10);

        return f1 + ' ' + f2 + '-' + f3;
    }
  }
  showLoader() {
    this.loader = true;
  }

  hideLoader() {
    this.loader = false;
  }

  presentSuccessToast(msg) {
    // this.toaster.success(msg)
  }

  presentFailureToast(msg) {
    // this.toaster.error(msg);
  }

  returnCurrentUserUid() {
    return new Promise(async (resolve) => {
      let uid = (await this.storage.getKey('uid')) as string;
      resolve(uid);
    });
  }

  presentAlert(msg) {
    console.log(msg);
    Swal.fire({
      title: 'Alert',
      text: msg,
    });
  }

  presentSuccess(msg) {
    Swal.fire({
      icon: 'success',
      title: msg,
    });
  }

  showToast(msg, type) {
    if (type == 'success') {
      this.alerts.presentSuccessToast(msg);
    } else {
      this.alerts.presentFailureToast(msg);
    }

    //M.toast({ html: msg, classes: type == 'success' ? 'dlvr-success-toast' : 'dlvr-error-toast' })
  }
  getCurrentLocationCoordinates() {
    return this.geolocations.getCurrentLocationCoordinates();
  }
  getCoordsForGeoAddress(address, _default = true) {
    return this.geolocations.getCoordsForGeoAddress(address, (_default = true));
  }
}
