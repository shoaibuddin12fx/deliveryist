import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { errorMessages } from 'src/app/helpers/error_messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { Router } from '@angular/router';
import { ImageCompressService } from 'src/app/services/image-compress.service';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
// import { FirebaseImagesService } from 'src/app/services/_helpers/firebase/firebase.images.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef;

  userRole = localStorage.getItem('userRole');
  editProfileForm: FormGroup;
  userProfileData;
  isPhotoUploaded = false;
  imageAPILink: any;
  imageURL: '';
  profileData;
  profilePic;
  reset = false;
  dynamic_col = 's12 m12';
  urls: any[] = [];
  files = [];
  aForm: FormGroup;
  id;
  extra_labels = [];
  submitted = false;
  tagpicker;
  title: string = 'Add Product';
  itemId: string;
  productSaved = false;
  coordinates: any;
  address: any;
  isCoordSet: any;
  currLng: any;
  currLat: any;
  imageCollection: any;
  links = [];
  isEdit: any;
  tags = [];
  url: any;
  input: any;
  urlLinks = [];
  firebase_url: any;
  link: any;
  categoryData;
  item;
  constructor(
    private route: Router,
    private consumerService: ConsumerApiService,
    private driverService: DriverApiService,
    private commonService: CommonServicesService,
    private imageCompressService: ImageCompressService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {
    this.createEditProfileForm();
    this.commonService
      .getUserProfileData()
      .then((data: any) => {
        this.profileData = data.profile;
        console.log(this.profileData);
        this.updateEditProfileForm(data.profile);
      })
      .catch((err) => {
        errorMessages.ERROR_FETCHING_PROFILE;
      });
  }

  ngOnInit() {}

  updateEditProfileForm(profileData) {
    console.log(profileData);
    this.editProfileForm.patchValue({
      first_name: profileData.full_name.split(' ')[0],
      last_name: profileData.full_name.split(' ')[1],
      email: profileData.email.toLowerCase(),
      // 'countryCode': new FormControl(null, [Validators.required]),
      contact: profileData.contact,
      // 'address': profileData.state,
      age: profileData.age,
      gender: profileData.gender,
      street: profileData.street,
      state: profileData.state,
      city: profileData.city,
      unit: profileData.unit,
      zip: profileData.zip,
      profile_pic: profileData.profile_pic,
    });
  }

  createEditProfileForm() {
    // create form
    this.editProfileForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl({ value: null, disabled: true }, [
        Validators.email,
        Validators.required,
      ]),
      // 'countryCode': new FormControl({null, disabled: true }, [Validators.required]),
      contact: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      // 'address': new FormControl(null)
      age: new FormControl(null, Validators.required),
      gender: new FormControl('female', Validators.required),
      street: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      unit: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
    });
  }

  editUserProfile() {
    if (this.editProfileForm.valid) {
      this.userProfileData = this.editProfileForm.value;
      let phNoValid = this.commonService.isPhoneNumberValid(
        this.editProfileForm.controls['contact'].value
      );
      let data;
      if (phNoValid) {
        data = {
          first_name: this.userProfileData.first_name,
          last_name: this.userProfileData.last_name,
          age: parseInt(this.userProfileData.age),
          zip: this.userProfileData.zip,
          state: this.userProfileData.state,
          city: this.userProfileData.city,
          street: this.userProfileData.street,
          contact: this.userProfileData.contact,
          email: this.userProfileData.email.toLowerCase(),
          gender: this.userProfileData.gender,
          unit: this.userProfileData.unit,
        };
      }
      if (phNoValid) {
        // edit consumer detail
        this.commonService
          .updateUserProfile(data)
          .then((res) => {
            this.userRole == 'Consumer'
              ? this.route.navigate(['consumer/consumerDashboard'])
              : this.route.navigate(['driver/driverDashboard']);
          })
          .catch((err) => {
            errorMessages.ERROR_EDIT_PROFILE;
          });
      } else if (!phNoValid) {
        this.editProfileForm.controls['contact'].setErrors({ valid: false });
        this.editProfileForm.invalid;
      }
    }
  }

  //Open  Modal
  // async openModel() {
  //   const modal = await this.modalController.create({
  //     component: ProfilePicSelectionComponent,
  //   });
  //   console.log('modal opening');
  //   return await modal.present().then(() => {
  //     console.log('model opened');
  //   });
  // }

  async openModel() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile Photo',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Change Photo',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Remove Photo',
          role: 'destructive',
          // id: 'delete-button',
          // data: {
          //   type: 'delete',
          // },
          handler: () => {
            console.log('Delete clicked');
          },
        },

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  openFile() {
    const el: HTMLElement = this.fileupload.nativeElement;
    el.click();
  }

  onSelectFile(event) {
    const self = this;
    const files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async (e: any) => {
      // this.imageURL = e.target.result;
      // const link = await this.imageCompressService.compressImage(this.imageURL);
      // this.imageAPILink = await this.fb.uploadProductImageAndGetRef(this.imageURL);
      // const obj = {
      //   link,
      //   selected: true,
      //   file: files[0],
      //   name: files[0].name,
      //   uploaded: false,
      // };
      const pictureLink = {
        profile_pic: this.imageAPILink.url,
      };
      this.commonService
        .updateUserProfile(pictureLink)
        .then((res: any) => {
          this.profileData = res.profile;
          this.closeModal();
        })
        .catch((err) => {
          errorMessages.ERROR_EDIT_PROFILE;
        });
    };
  }

  onRemovePhotoClick() {
    const pictureLink = {
      profile_pic: null,
    };
    this.commonService
      .updateUserProfile(pictureLink)
      .then((res: any) => {
        this.profileData = res.profile;
        // this.closeModal('modalProfilePic');
      })
      .catch((err) => {
        errorMessages.ERROR_EDIT_PROFILE;
      });
  }
}
