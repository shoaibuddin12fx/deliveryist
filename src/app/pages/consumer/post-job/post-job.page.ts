import { LocationStrategy } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AutocompletePage } from 'src/app/components/autocomplete/autocomplete.page';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { ImageCompressService } from 'src/app/services/image-compress.service';
import { StorageService } from 'src/app/services/_helpers/storage.service';
import { BasePage } from '../../base-page/base-page';
import { CartService } from '../../market-place/services/cart.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
// import { DriverinstructionComponent } from '../components/driverinstruction.component';

declare var google;

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.page.html',
  styleUrls: ['./post-job.page.scss'],
})
export class PostJobPage extends BasePage implements OnInit, AfterViewInit {
  @ViewChild('originSearch', { static: false })
  public searchElement: ElementRef;
  @ViewChild('destinationSearch', { static: false })
  public destinationSearchElement: ElementRef;
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef;

  urls: any[] = [];
  files = [];
  links = [];
  firebaseUrls: any = [];
  dynamic_col = 's12 m12';
  postJobForm: FormGroup;
  // modalActions = new EventEmitter<string>(); //| MaterializeAction
  datepickerInstance;
  selectedDate;
  disabled: true;
  btnEnabled = false;
  btnEnabledForVehical = false;
  categoryBtnEnabled = false;
  step = 'step1';
  loader = false;
  step1;
  step2;
  step3;
  step4;
  step5;
  public lat;
  public lng;
  totalDuration;
  totalDistance;
  public origin: any;
  public destination: any;
  public order_id;
  public OrderDetail: any;
  public cart: any;
  public deliveryCharges;
  public total;
  previousUrl: string;
  showBackButton = false;
  hidden = true;
  loading;
  openInstruction = false;
  categoryList = [
    {
      iconName: 'devices_other',
      labelName: 'Electronic',
      imgSrc: 'assets/images/electronics_icon.png',
    },
    {
      iconName: 'description',
      labelName: 'Home',
      imgSrc: 'assets/images/home_icon.png',
    },
    {
      iconName: 'wb_iridescent',
      labelName: 'Furniture',
      imgSrc: 'assets/images/Furniture_icon.png',
    },
    {
      iconName: 'card_giftcard',
      labelName: 'Documents',
      imgSrc: 'assets/images/documents_icon.png',
    },
    {
      iconName: 'king_bed',
      labelName: 'Miscellaneous',
      imgSrc: 'assets/images/miscellaneous_icon.png',
    },
    {
      iconName: 'more_horiz',
      labelName: 'Other',
      imgSrc: 'assets/images/other_icon.png',
    },
  ];
  elems;
  public renderOptions = {
    suppressMarkers: true,
    draggable: true,
    zoom: 8,
  };

  public markerOptions = {
    origin: {
      icon: 'assets/images/destination1.png',
      draggable: true,
    },
    destination: {
      icon: 'assets/images/source1.png',
      draggable: true,
    },
  };

  constructor(
    injector: Injector,
    private ngZone: NgZone,
    public storage: StorageService,
    public cartService: CartService,
    private imageCompressService: ImageCompressService,
    private loc: LocationStrategy,
    public consumerApiService: ConsumerApiService,
    public modalController: ModalController // private mapsAPILoader: MapsAPILoader
  ) {
    super(injector);

    // this.ngZone.run(() => {
    // const location = JSON.parse(localStorage.getItem('location'));

    // // let location = {lat: 24.9091488, lng:67.104036}
    // // console.log(location);
    // this.lat = location.lat;
    // this.lng = location.lng;

    // console.log(this.totalDistance);

    // prepare post job form
    this.postJobForm = new FormGroup({
      sourceAddress: new FormControl(null, [Validators.required]),
      sourceAddressAppartment: new FormControl(null, [Validators.required]),
      deliveryAddress: new FormControl(null, [Validators.required]),
      deliveryAddressAppartment: new FormControl(null, [Validators.required]),
      jobAmount: new FormControl(23, [Validators.required]),
      itemCategory: new FormControl('Accessories', [Validators.required]),
      deliveryVehicle: new FormControl('Sedan', [Validators.required]),
      deliveryType: new FormControl('Immediate', Validators.required),
      deliveryDate: new FormControl(),
      receiverName: new FormControl(''),
      receiverNumber: new FormControl(''),
      instructionForReceiver: new FormControl(null),
    });

    this.order_id = this.activatedRoute.snapshot.queryParams.order_id;
    if (this.order_id) {
      console.log('Order Id', this.order_id);
      this.getOrderDetail(this.order_id);
    }

    history.pushState(null, null, window.location.href);
    this.loc.onPopState(() => {
      console.log('onPopState');

      const postFormValues = this.postJobForm.controls;
      if (this.step == 'step2') {
        history.pushState(null, null, window.location.href);
        this.step = 'step1';
        document.getElementById('truckprogress').style.width = '0%';
        postFormValues.itemCategory.setValue('Accessories');
        this.showBackButton = false;
      } else if (this.step == 'step3') {
        history.pushState(null, null, window.location.href);
        this.step = 'step2';
        document.getElementById('truckprogress').style.width = '20%';
        postFormValues.deliveryVehicle.setValue('Sedan');
      } else if (this.step == 'step4') {
        history.pushState(null, null, window.location.href);
        this.step = 'step3';
        document.getElementById('truckprogress').style.width = '40%';
        postFormValues.instructionForReceiver.reset();
        postFormValues.deliveryType.setValue('Immediate');
        postFormValues.deliveryDate.reset();
        this.datepickerInstance = undefined;
        this.elems = undefined;
        this.urls = [];
        this.files = [];
        this.links = [];
      } else if (this.step == 'step5') {
        history.pushState(null, null, window.location.href);
        this.step = 'step4';
        document.getElementById('truckprogress').style.width = '80%';
        postFormValues.receiverName.reset();
        postFormValues.receiverNumber.reset();
        postFormValues.jobAmount.reset();
        this.datepickerInstance = undefined;
        this.elems = undefined;

        this.selectedDate = postFormValues.deliveryDate.value;
        if (this.selectedDate) {
          const year = this.selectedDate.getFullYear();
          const month = this.selectedDate.toLocaleString('default', {
            month: 'short',
          });
          const date = this.selectedDate.getDate();
          const formatedDate = month + ' ' + date + ', ' + year;
          postFormValues.deliveryDate.setValue(formatedDate);
        }
      } else if (this.step == 'step1') {
        history.pushState(null, null, window.location.href);
      }
    });
    // });
  }

  // scrollEvent(){
  //   const search = this.originSearch.nativeElement;

  //   search.
  // }
  async getOrderDetail(order_id) {
    const order = (await this.storage.getKey('order')) as any;
    if (order) {
      this.OrderDetail = JSON.parse(order);
      console.log('Order Detail', this.OrderDetail);
      this.deliveryCharges = this.OrderDetail.delivery_charges;
      this.cart = this.cartService.get();
      this.total = this.cart.total;
      console.log('Order Charges', this.deliveryCharges);
    }
  }

  getTotalCharges() {
    return this.deliveryCharges + this.postJobForm.controls.jobAmount.value;
  }

  getTotalCost() {
    return (
      this.deliveryCharges +
      this.postJobForm.controls.jobAmount.value +
      this.total
    );
  }

  ngOnInit() {
    this.searchLoad('origin');
    this.searchLoad('destination');
  }

  ngAfterViewInit() {
    this.step1 = document.getElementById('step1');
    this.step2 = document.getElementById('step2');
    this.step3 = document.getElementById('step3');
    this.step4 = document.getElementById('step4');
    this.step5 = document.getElementById('step5');
  }

  async next() {
    const postFormValues = this.postJobForm.controls;
    console.log('Steps: ', this.step);

    // // this.modalActions.emit({ action: 'modal', params: ['close'] });

    if (this.step === 'step1') {
      this.showBackButton = true;

      if (
        postFormValues.sourceAddress != null &&
        postFormValues.deliveryAddress != null
      ) {
        const res = await this.utility.getDistanceOfCoordinates(
          this.origin,
          this.destination
        );
        console.log(res);

        if (res['distance']) {
          this.totalDistance = res['distance'];

          if (this.totalDistance.includes('ft')) {
            this.utility.showToast(
              'please select distance larger then ' + this.totalDistance,
              'error'
            );
            return;
          }

          // await this.callForAmount();
        }
        // await this.callForAmount();
        this.step = 'step2';
        document.getElementById('truckprogress').style.width = '20%';
        // this.step1.classList.remove('is-active');
        // this.step1.classList.add('is-complete');
        // this.step2.classList.add('is-active');
      }
    } else if (this.step === 'step2') {
      this.showBackButton = true;
      if (postFormValues.itemCategory != null) {
        this.step = 'step3';
        document.getElementById('truckprogress').style.width = '40%';
        // this.step2.classList.remove("is-active");
        // this.step2.classList.add("is-complete");
        // this.step3.classList.add("is-active");
      }
    } else if (this.step === 'step3') {
      this.showBackButton = true;
      if (postFormValues.deliveryVehicle != null) {
        this.step = 'step4';
        document.getElementById('truckprogress').style.width = '60%';
        // this.step3.classList.remove("is-active");
        // this.step3.classList.add("is-complete");
        // this.step4.classList.add("is-active");
      }
    } else if (this.step === 'step4') {
      this.showBackButton = true;
      if (
        postFormValues.instructionForReceiver != null &&
        postFormValues.deliveryType != null
      ) {
        document.getElementById('truckprogress').style.width = '80%';
        this.uploadfiles().then((res) => {
          this.firebaseUrls = res;
        });
        if (postFormValues.jobAmount != null) {
          document.getElementById('truckprogress').style.width = '100%';
          // this.step5.classList.add("is-complete");
          this.navigateToPaymentScreen();
        }

        // this.step4.classList.remove("is-active");
        // this.step4.classList.add("is-complete");
        // this.step5.classList.add("is-active");
      }
      this.modals.present(OrderSummaryComponent);
    } else if (this.step === 'step5') {
      this.loader = true;
      this.showBackButton = true;

      if (
        postFormValues.receiverName != null &&
        postFormValues.receiverNumber != null &&
        postFormValues.jobAmount != null
      ) {
        document.getElementById('truckprogress').style.width = '100%';
        // this.step5.classList.add("is-complete");
        this.navigateToPaymentScreen();
        this.loader = false;
      }
    }
  }

  //open modal
  openModal() {
    // // this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  navigateToPaymentScreen() {
    if (this.selectedDate) {
      this.postJobForm.controls.deliveryDate.setValue(this.selectedDate);
    }

    if (this.postJobForm.valid) {
      const newJobData = this.postJobForm.value;
      console.log('Nav Delivery Date', newJobData.deliveryDate);
      const postJobData: any = {
        job_latitude: this.origin.lat,
        job_longitude: this.origin.lng,
        // job_latitude: 249091488,
        // job_longitude: 67104036,
        job_address: newJobData.sourceAddress,
        delivery_latitude: this.destination.lat,
        delivery_longitude: this.destination.lng,
        // delivery_latitude: 24.9091488,
        // delivery_longitude: 67.104036,
        delivery_address: newJobData.deliveryAddress,
        job_price: newJobData.jobAmount,
        description: '',
        priority: newJobData.deliveryType,
        item_category: newJobData.itemCategory,
        package_size: newJobData.deliveryVehicle,
        // package_size: 'truck',
        receiver_name:
          newJobData.receiverName != null ? newJobData.receiverName : '',
        receiver_contact:
          newJobData.receiverNumber != null ? newJobData.receiverNumber : '',
        expected_delivery_time:
          newJobData.deliveryDate != null
            ? new Date(newJobData.deliveryDate).toISOString().split('T')[0]
            : '',
        receiver_instructions:
          newJobData.instructionForReceiver != null
            ? newJobData.instructionForReceiver
            : '',
        source_address_appartment:
          newJobData.sourceAddressAppartment != null
            ? newJobData.sourceAddressAppartment
            : '',
        delivery_address_appartment:
          newJobData.deliveryAddressAppartment != null
            ? newJobData.deliveryAddressAppartment
            : '',
        photos_urls: this.firebaseUrls || [],
        distance: parseFloat(this.totalDistance?.replace('mi', '')),
      };

      // let phNoValid = this.commonService.isPhoneNumberValid(this.postJobForm.controls['receiverNumber'].value);

      // if(phNoValid){
      this.consumerApiService
        .postNewJob(postJobData)
        .then((res: any) => {
          const obj = {
            jobId: res.jobId,
            amount: newJobData.jobAmount.toFixed(2),
            pickup: newJobData.sourceAddress,
            delivery: newJobData.deliveryAddress,
            packageCategory: newJobData.itemCategory,
            vehicleType: newJobData.deliveryVehicle,
            deliveryType: newJobData.deliveryType,
            deliveryAmount: newJobData.jobAmount,
            delivery_time:
              newJobData.deliveryDate != null ? newJobData.deliveryDate : 'N/A',
          };
          if (this.order_id) {
            obj['orderId'] = this.order_id;
            obj.amount = this.getTotalCost();
            obj['paymentType'] = this.OrderDetail.payment_type;
          }

          this.router.navigate(['consumer/paymentMode', obj]);
        })
        .catch((err) => console.log({ err }));
      // } else {
      //   this.postJobForm.controls['receiverNumber'].setErrors({ valid: false });
      //   this.postJobForm.invalid;
      // }
    }
  }

  setdeliveryVehicle(size) {
    this.postJobForm.controls.deliveryVehicle.setValue(size);
  }

  async activeType(type) {
    this.postJobForm.controls.deliveryType.setValue(type);
    const res = await this.modals.present(
      DatePickerComponent,
      {},
      'transparent-modal'
    );
    console.log('Flixilbe Time', res);
  }

  searchLoad(types) {
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete;
    //   if (types == 'origin') {
    //     autocomplete = new google.maps.places.Autocomplete(
    //       this.searchElement.nativeElement,
    //       {
    //         strictBounds: true,
    //       }
    //     );
    //   } else {
    //     autocomplete = new google.maps.places.Autocomplete(
    //       this.destinationSearchElement.nativeElement
    //     );
    //   }
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       } else {
    //         if (types == 'origin') {
    //           this.postJobForm.controls['sourceAddress'].setValue(
    //             place.formatted_address
    //           );
    //           this.getLatLng(
    //             place.geometry.location.lat(),
    //             place.geometry.location.lng(),
    //             'origin'
    //           );
    //         } else if (types == 'destination') {
    //           this.postJobForm.controls['deliveryAddress'].setValue(
    //             place.formatted_address
    //           );
    //           this.getLatLng(
    //             place.geometry.location.lat(),
    //             place.geometry.location.lng(),
    //             'destination'
    //           );
    //         }
    //       }
    //     });
    //   });
    // });
  }

  getLatLng(latitude, longitude, addType) {
    console.log(latitude, longitude);
    addType == 'origin'
      ? (this.origin = { lat: latitude, lng: longitude })
      : (this.destination = { lat: latitude, lng: longitude });
    console.log(this.origin);
  }

  // onResponse() {
  //   return new Promise<void>((resolve, reject) => {
  //     const service = new google.maps.DistanceMatrixService();
  //     const origin1 = new google.maps.LatLng(this.origin.lat, this.origin.lng);
  //     // let origin1 = new google.maps.LatLng(24.9091488,  67.104036);
  //     console.log(origin1);
  //     const destinationB = new google.maps.LatLng(
  //       this.destination.lat,
  //       this.destination.lng
  //     );
  //     service.getDistanceMatrix(
  //       {
  //         origins: [origin1],
  //         destinations: [destinationB],
  //         unitSystem: google.maps.UnitSystem.IMPERIAL,
  //         travelMode: google.maps.TravelMode.DRIVING,
  //       },
  //       (response, status) => {
  //         this.totalDistance = response.rows[0].elements[0].distance.text;
  //         this.totalDuration = response.rows[0].elements[0].duration.text;
  //         resolve(this.totalDistance);
  //       }
  //     );
  //   });
  // }

  // setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //      setInterval(() => {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         let latitude = position.coords.latitude;
  //         let longitude = position.coords.longitude;
  //         // alert("Your lat lng is "+ latitude+ " " + longitude)
  //         console.log(latitude, longitude);
  //       });
  //      }, 3000)
  //   }
  // }
  openDatePicker() {
    // if(!this.elems){
    //   this.elems = document.querySelector('.datepicker');
    // }
    // M.Datepicker.init(this.elems,{autoClose: true, onSelect: (res) => {
    //   this.postJobForm.controls['deliveryDate'].setValue(res);
    //   this.datepickerInstance = undefined;
    //   this.selectedDate = '';
    // }});
    // this.openDateModal();
  }

  openDateModal() {
    // if(this.datepickerInstance == undefined){
    //   this.datepickerInstance = M.Datepicker.getInstance(this.elems);
    //   this.datepickerInstance.open();
    // }
  }

  //Open  Modal
  async openModel() {
    this.openInstruction = true;
    // const modal = await this.modalController.create({
    //   component: DriverinstructionComponent,
    // });
    // console.log('modal opening');
    // return await modal.present().then(() => {
    //   console.log('model opened');
    // });
  }
  closeInstruction() {
    this.openInstruction = false;
  }
  //close modal
  closeModel() {
    // var elems = document.getElementById(modal);
    // var instances = M.Modal.getInstance(elems);
    // instances.close();
  }

  selectingCategory(category) {
    this.postJobForm.controls.itemCategory.setValue(category);
    this.categoryBtnEnabled = true;
  }

  saveInstructions() {
    this.closeModel();
  }
  // Call to calculate amount from distance and time
  callForAmount() {
    return new Promise(async (resolve) => {
      console.log(this.totalDistance);

      const data = {
        distance: this.totalDistance, // parseFloat(this.totalDistance.split('mi')[0]) * 1609,
        // duration: this.totalDuration,
        // deliveryVehicle: this.postJobForm.controls['deliveryVehicle'].value,
        // deliveryType: this.postJobForm.controls['deliveryType'].value
      };
      await this.consumerApiService
        .getAmountForOrder(data)
        .then((res: any) => {
          const total = parseFloat(res.total.toFixed(2));
          this.postJobForm.controls.jobAmount.setValue(total);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  openFile() {
    const el: HTMLElement = this.fileupload.nativeElement;
    el.click();
  }

  onSelectFile(event) {
    // this.urls = [];
    // this.files = [];
    const self = this;

    const files = event.target.files;
    console.log(files);
    if (files) {
      if (files.length > 5) {
        alert('Only Five Images can be added');
        return;
      }

      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e: any) => {
          const compressImages = e.target.result;

          const link = await this.imageCompressService.compressImage(
            compressImages
          );
          this.links.push(link);

          var obj = {};
          obj['link'] = link;
          obj['selected'] = true;
          obj['file'] = file;
          obj['name'] = file.name;
          obj['uploaded'] = false;

          if (this.urls.length < 5) {
            this.urls.push(obj);
            this.files.push(file);
          }
          console.log(file);

          // }

          switch (this.files.length) {
            case 1:
              this.dynamic_col = '';
              break;
            case 2:
              break;
            case 3:
              break;
            case 4:
              break;
            case 5:
              break;
          }
        };
      }
    }
  }

  justDelete(i) {
    if (this.urls[i].uploaded == true) {
      console.log(this.urls[i]);

      const flag = confirm('Are you sure you want to delete the image?');
      if (!flag) {
        return;
      }
      this.urls.splice(i, 1);
      const obj = {
        link: '/assets/images/CameraUploadImage.svg',
        name: null,
        file: null,
        progress: false,
        uploaded: false,
        selected: false,
      };
      this.urls.push(obj);
    } else {
      this.urls.splice(i, 1);
    }
  }
  async uploadfiles() {
    return new Promise(async (resolve) => {
      const self = this;

      if (this.files.length > 0) {
        this.firebaseUrls = [];
        // let uid = localStorage.getItem('userId');
        const url = [];
        for (let i = 0; i < this.files.length; i++) {
          const _url = self.urls[i];
          _url.progress = true;
          // let link = await this.fb.uploadProductImageAndGetRef(_url['link']);
          _url.progress = false;

          // let obj = {
          //   name: link['name'],
          //   type: 'product',
          //   firebase_url: link['url'],
          // };
          // url[i] = link['url'];
          // this.firebaseUrls.push(link['url']);
        }
        console.log(url);
        resolve(url);
      }
    });
  }

  onChange($event) {
    console.log($event);
    this.activateandDeactivateCalendarModal();
  }

  activateandDeactivateCalendarModal() {
    this.hidden = !this.hidden;
    console.log(this.postJobForm.get('deliveryDate'));
  }

  btnSet() {
    console.log('clicked setBtn');
    this.btnEnabled = true;
  }

  btnSetForVehical() {
    console.log('clicked setBtn for vehical');
    this.btnEnabledForVehical = true;
  }

  async openAutoComplete(param) {
    const res = await this.modals.present(AutocompletePage);
    console.log(res);

    let data = res.data;

    if (param == 'pick') {
      if (data.address) {
        this.postJobForm.controls['sourceAddress'].patchValue(data.address);
      }
      if (data.coords) {
        this.origin = data.coords;
      }
    }

    if (param == 'drop') {
      if (data.address) {
        this.postJobForm.controls['deliveryAddress'].patchValue(data.address);
      }
      if (data.coords) {
        this.destination = data.coords;
      }
    }
  }
}
