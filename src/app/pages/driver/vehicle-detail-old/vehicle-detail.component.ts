import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverApiService } from 'src/app/services/driver-api.service';
// import M from 'materialize-css/dist/js/materialize.min.js';
declare var Vouched;
@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef;

  vehicleForm: FormGroup;
  vouched;
  instance;
  licencePhotoFile;
  licenseVerified = false;
  input;
  loading= false;
  constructor(
    private router: Router,
    private driverApiService: DriverApiService,
  ) {
    this.vehicleForm = new FormGroup({
      vehicleNumber: new FormControl(null, Validators.required),
      vehicleType: new FormControl('0', Validators.required),
      driver_licence: new FormControl(null, Validators.required),
    });
    this.loadScript();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.submitData();
    // this.instance = M.FormSelect.init(document.querySelector('select'));
  }

  openFilePicker() {
    const el: HTMLElement = this.fileupload.nativeElement;
    el.click();
  }

  processFile(event) {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    if (file) {
      console.log("coming here")
      console.log(this.vehicleForm.get('driver_licence'))
      console.log(file);
      // this.vehicleForm.get('driver_licence').setValue({ file, type: file.type, documentURL: '' });
      // reader.onload = e => this.vehicleForm.get('driver_licence').value.documentURL = reader.result;
      reader.readAsDataURL(file);
      this.licencePhotoFile = file;
    }
  }

  submitVehicleInfo() {
    this.loading = true;
    let reqData= {
      registration_number: this.vehicleForm.controls['vehicleNumber'].value,
      vehicle_type: this.vehicleForm.controls['vehicleType'].value,
      driver_licence: this.vehicleForm.controls['driver_licence'].value,
      is_verified: 1
    }

    this.driverApiService.approveDriverLicense(reqData).then((response: any) => {
      console.log('success', response);
    this.router.navigate(['driver/driverDashboard']);
    }).catch(err => {
      this.loading = false;
      console.log(err);
    });
  }

  loadScript() {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://static.vouched.id/widget/vouched.js';
      window.document.body.appendChild(s);
    }
  }

  submitData() {
    this.vouched = Vouched({
      appId: 'f@#5QFMzNoz7wFo_~uR2T43c*Dz~lH',
      type: 'id',
      face: 'both',
      id: 'both',
      crossDevice: true,
      callbackURL: 'https://deliveryist.com/admin-laravel-7x/public/api/user/verifyDriverLicense',
      theme: {
        baseColor: '#44c065',
        // bgColor: '#333333',
      },
      properties: [{
        name: 'uid',
        value: localStorage.getItem('userId')
      }],
      onSubmit: ({ stage, attempts, job }) => {
            console.log('submit', { stage, attempts, job });
      },
      onCamera: ({ hasCamera, hasPermission }) => {
        console.log('onCamera', { hasCamera, hasPermission });
      },
      onInit: ({token}) => {
        // if crossDevice is true, a web token is created during initialization for
        // session handoffs to other devices
        console.log('initialization');
      },
      onDone: (job) => {
        console.log(job);
        this.licenseVerified = true;
        this.vehicleForm.get('driver_licence').setValue(job.result.id)
        // token used to query jobs
        console.log('Scanning complete', { token: job.token });
        // query the job with the token
        // fetch(`/yourapi/idv?job_token=${job.token}`);
      }
    });
    this.vouched.mount('#vouched-element');
  }

  getSelected(){
    console.log(this.input);
    // return this.input;
  }
}
