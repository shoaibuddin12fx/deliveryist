import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { ModalService } from 'src/app/services/_helpers/modal.service';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { AutocompletePage } from '../../../components/autocomplete/autocomplete.page';
import { BasePage } from '../../base-page/base-page';

const countries = require('./../../../data/countries.json');

interface Countries {
  id: number;
  code: string;
  name: string;
  dial_code: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePage implements OnInit {
  modalActions = new EventEmitter<string>(); // | MaterializeAction
  signupForm: FormGroup;
  aForm: FormGroup;
  displayUserDetail;
  showDetail: boolean = false;
  picturefile;
  regionCode = '+1';
  step = 'step1';
  loading = false;
  country_codes: Countries[] = countries;
  userOTP;
  isSocialLoginInitiated = false;
  contactNumber;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '-',
    inputStyles: {
      width: '52px',
      height: '50px',
      border: 'none',
      background: '#e9f0f2',
      'border-radius': '6px',
      'margin-left': '8px',
    },
  };
  utility: any;
  pick: any;
  drop: any;
  events: any;
  constructor(
    injector: Injector,
    public authService: AuthService,
    private route: Router,
    public commonService: CommonServicesService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute,
    public modals: ModalService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {
    super(injector);
    this.isSocialLoginInitiated =
      this.activatedRoute.snapshot.queryParams.isSocialLoginInitiated;
    console.log(this.isSocialLoginInitiated);
  }

  ngOnInit() {
    let code = localStorage.getItem('countryCode');
    this.regionCode = code ? code : '+1';
    this.prepareForm();
  }

  prepareForm() {
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      countryCode: new FormControl(
        'US', // + PhoneNumber.getCountryCodeForRegionCode(this.regionCode),
        [Validators.required]
      ),
      contact: new FormControl(null, Validators.required),
      // age: new FormControl(null, Validators.required),
      // 'gender': new FormControl('female', Validators.required),
      street: new FormControl(null, Validators.required),
    });
  }

  signupUser() {
    if (this.signupForm.valid) {
      const formVal = this.signupForm.controls;
      const phNoValid = this.commonService.isPhoneNumberValid(
        formVal.contact.value
      );

      console.log(phNoValid);
      //if (phNoValid) {
      const data = {
        first_name: formVal.first_name.value,
        last_name: formVal.last_name.value,
        password: formVal.password.value,
        email: formVal.email.value.toLowerCase(),
        contact: formVal.contact.value,
        // age : parseInt(formVal.age),
        // gender : formVal.gender,
        street: formVal.street.value,
        // state: formVal.state.value,
        // city: formVal.city.value,
        // unit: formVal.unit.value,
        // zip: formVal.zip.value,
      };
      this.loading = true;
      this.commonService
        .userSignUp(data)
        .then((res: any) => {
          this.goForLogin();
        })
        .catch((err) => {
          console.log('error', err);
          this.loading = false;
        });
      // } else {
      //   this.signupForm.controls['contact'].setErrors({ valid: false });
      //   this.signupForm.invalid;
      // }
    }
  }

  goForLogin() {
    // this.route.navigate(['pages/user-role-selection']);
    this.navigateTo('pages/user-role-selection');
    this.reset();
  }

  reset() {
    this.step = 'step1';
    document.getElementById('truckprogress').style.width = '0%';
    this.signupForm.reset({
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      countryCode: 'US',
      contact: '',
      street: '',
    });
    this.contactNumber = '';
    // this.prepareForm();
  }

  onVerify() {
    const formVal = this.signupForm.controls;
    let contactNo = '';
    contactNo = this.contactNumber
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('-', '')
      .replaceAll(' ', '');

    // convert country code to +XX
    const cc = this.signupForm.controls['countryCode'].value.toString();
    console.log(cc);

    const selectedCountry = countries.find((x) => x.code == cc);
    console.log(selectedCountry);
    contactNo = selectedCountry.dial_code + contactNo;
    console.log({ contactNo });

    const phNoValid = this.commonService.isPhoneNumberValid(contactNo);
    console.log(phNoValid);
    // if (phNoValid) {
    const data = {
      contact: contactNo,
      forgetpassword: false,
    };
    // call getOTPforMobileNumberVerification API
    console.log({ data });
    this.loading = true;
    this.commonService
      .getOTPforMobileNumberVerification(data)
      .then((res: any) => {
        res.status === 200 ? (this.step = 'step2') : null;
        document.getElementById('truckprogress').style.width = '20%';
        this.loading = false;
        // this.userOTP = res.otp;
        // let first:any = document.getElementById('firstNum');
        // let second:any = document.getElementById('secondNum');
        // let third:any= document.getElementById('thirdNum');
        // let forth:any = document.getElementById('fourthNum');
        // first.value = otp[0];
        // second.value = otp[1];
        // third.value = otp[2];
        // forth.value = otp[3];
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
        // this.route.navigate(['auth/login']);
      });
    // } else {
    //   alert('Phone not valid');
    // }
  }

  // async showAddressModal() {
  //   const res = await this.modals.present(AutocompletePage);
  //   console.log(res);

  //   let data = res.data;
  //   console.log('data5', data);
  // }

  async showAddressModal() {
    const res = await this.modals.present(AutocompletePage);
    console.log('Hi', { res });

    const data = res.data;

    if (data.data == 'A') {
      return;
    }
    console.log('Address', data.address);

    this.signupForm.controls['street'].setValue(data.address);
  }

  onOtpChange(otp) {
    this.userOTP = otp;
    console.log('Security COde1', this.userOTP);
  }

  verifyOTP() {
    // const first: any = document.getElementById('firstNum');
    // const second: any = document.getElementById('secondNum');
    // const third: any = document.getElementById('thirdNum');
    // const fourth: any = document.getElementById('fourthNum');
    // this.userOTP = first.value + second.value + third.value + fourth.value;
    this.loading = true;

    const data: any = { otp: parseInt(this.userOTP), forgetpassword: false };
    this.commonService
      .verifyOTPforMobileNumberVerification(data)
      .then((res: any) => {
        if (res.status === 200) {
          if (this.isSocialLoginInitiated) {
            this.commonService.getUserProfileData().then(async (res) => {
              this.route.navigate(['auth/userRoleSelection']);
            });
          } else {
            this.step = 'step3';
            document.getElementById('truckprogress').style.width = '40%';
          }
        }
        console.log('Security COde', data);

        localStorage.setItem('security-otp', data.otp);
      })

      .catch((err) => {
        console.log(err);
        this.loading = false;
        // this.route.navigate(['auth/login'])
      });
  }

  // goToSignupSecond(){
  //   let data = { otp : this.userOTP };
  //   this.commonService.verifyOTPforMobileNumberVerification(data).then((res:any) => {
  //     (res.status == 200) ? this.closeModal() : null;
  //     this.step = 'step2';
  //   })
  // }

  goToSignupThird() {
    this.step = 'step3';
    this.loading = false;

    document.getElementById('truckprogress').style.width = '60%';
  }

  goToSignupFourth() {
    this.loading = false;

    this.step = 'step4';
    this.loading = false;

    document.getElementById('truckprogress').style.width = '80%';
  }

  // Open  Modal
  //  openModel(modal) {
  //   const elems = document.getElementById(modal);
  //   console.log("elems" ,elems );
  //   const instances = M.Modal.getInstance(elems);

  //   instances.open();
  // }
  // close modal
  // closeModel(modal) {
  //   const elems = document.getElementById(modal);
  //   const instances = M.Modal.getInstance(elems);
  //   instances.close();
  // }

  sendAnotherNewCode() {}

  openModel(): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.actionSheetController.create({
        header: 'Number : (627) 895 5886',
        buttons: [
          {
            text: 'Send a new code ',
            handler: () => {
              this.onVerify();
            },
          },
          {
            text: 'call me',
          },
          {
            text: 'Use differnt number',
            handler: () => {
              this.step = 'step1';
              this.loading = false;
            },
          },
          {
            text: 'Skip',
            handler: () => {
              this.step = 'step3';
            },
          },
          {
            text: 'Cancel',
          },
        ],
      });
      alert.present();
    });
  }
  create(arg0: {
    header: any;
    message: any;
    inputs: any;
    buttons: (
      | { text: string; role: string; handler: () => void }
      | { text: string; handler: (data: any) => void }
    )[];
  }) {
    throw new Error('Method not implemented.');
  }

  //  async openModel(){
  //   const modal = await this.modalController.create({
  //     component: HavingTroubleComponentComponent,
  //   });
  //   console.log("modal opening")
  //   return await modal.present().then(()=>{
  //     console.log("model opened")
  //   })
  // }

  // closeModal(){
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }

  // Send New Code from 'having trouble' Popup
  sendNewCode() {
    this.onVerify();
    // this.closeModel('modalTroubleList');
  }

  // Use Diff Num from 'having trouble' Popup
  useDiffNum() {
    this.step = 'step1';
    this.closeModel('modalTroubleList');
  }
  closeModel(arg0: string) {
    throw new Error('Method not implemented.');
  }

  signInWithGoogle() {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
    //   const formData = this.signupForm;
    //   formData.controls['first_name'].setValue(res.firstName);
    //   formData.controls['last_name'].setValue(res.lastName);
    //   formData.controls['email'].setValue(res.email.toLowerCase());
    //   formData.controls.email.disable();
    //   this.utilityService.showToast('You have successfully registred. Please verify your mobile number and other details.', 'success');
    // });
  }

  onTelephoneChange(ev) {
    if (ev.inputType !== 'deleteContentBackward') {
      const utel = this.utilityService.onkeyupFormatPhoneNumberRuntime(
        ev.target.value,
        false
      );
      console.log(utel);
      ev.target.value = utel;
      this.signupForm.controls['contact'].patchValue(utel);
      // ev.target.value = utel;
    }
  }
}
