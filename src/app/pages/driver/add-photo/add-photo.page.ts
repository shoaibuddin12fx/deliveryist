import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { errorMessages } from 'src/app/helpers/error_messages';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { ImageCompressService } from 'src/app/services/image-compress.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage extends BasePage implements OnInit {
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef;

  imageURL: '';
  imageAPILink: any;
  isPhotoUploaded = false;
  loading = false;
  constructor(
    injector: Injector,
    private imageCompressService: ImageCompressService,
    public commonService: CommonServicesService,
    private route: Router,
    private commonApiService: CommonServicesService,
    public actionSheetController: ActionSheetController
  ) {
    super(injector);
  }

  ngOnInit() {}

  // Open  Modal
  openModel(modal) {
    // const elems = document.getElementById(modal);
    // const instances = M.Modal.getInstance(elems);
    // instances.open();
  }

  // close modal
  closeModel(modal) {
    // const elems = document.getElementById(modal);
    // const instances = M.Modal.getInstance(elems);
    // instances.close();
  }

  openFile() {
    if (!this.isPhotoUploaded) {
      const el: HTMLElement = this.fileupload.nativeElement;
      el.click();
    } else {
      const pictureLink = {
        profile_pic: this.imageAPILink.url,
      };
      this.commonService
        .updateUserProfile(pictureLink)
        .then((res) => {
          // this.route.navigate(['driver/myVehicle']);
          this.navigateTo('pages/vehicle-detail/');
        })
        .catch((err) => {
          errorMessages.ERROR_EDIT_PROFILE;
        });
    }
  }

  onSelectFile(event) {
    const self = this;
    const files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async (e: any) => {
      this.imageURL = e.target.result;
      const link = await this.imageCompressService.compressImage(this.imageURL);
      const obj = {
        link,
        selected: true,
        file: files[0],
        name: files[0].name,
        uploaded: false,
      };
    };
    this.isPhotoUploaded = true;
  }

  changeRole(role) {
    return new Promise((resolve, reject) => {
      this.commonApiService
        .userRoleChange({ role: role })
        .then((data) => {
          localStorage.setItem('userRole', role);
          this.trackUser();
          resolve('');
        })
        .catch((err) => {
          reject();
        });
    });
  }

  async trackUser() {
    await this.commonApiService
      .trackUser()
      .then((data) => {})
      .catch((err) => {});
  }

  async addPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile Photo',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Choose from library ',
          role: 'destructive',

          handler: () => {
            this.openFile();
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

    console.log('go For Licence ');
    this.loading = true;
    // this.goAsDriver();
    // this.navigateTo('pages/driver/vehicle-detail');
  }

  goAsDriver() {
    this.changeRole('Driver').then(() => {
      this.commonApiService.getUserProfileData().then((res: any) => {
        if (res.profile.is_vehicle_verified) {
          console.log(' RUn WHEN LICENSE HAVE PAGE ADD PHOTO');
          // this.route.navigateByUrl('driver/driverDashboard');
          this.navigateTo('pages/driver-dashboard/');
          // this.route.navigateByUrl('addPhoto');
          // this.navigateTo('pages/add-photo');
        } else {
          // this.route.navigateByUrl('driver/myVehicle');
          this.navigateTo('pages/driver/vehicle-detail');
          console.log('Run WHen License Require');
          // this.route.navigateByUrl('driver/addPhoto');
          // this.navigateTo('pages/add-photo');
        }
        console.log(res);
      });
    });
  }
}
