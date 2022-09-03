import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import M from 'materialize-css/dist/js/materialize.min.js';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { ImageCompressService } from 'src/app/services/image-compress.service';
import { errorMessages } from 'src/app/helpers/error_messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef;

  imageURL: '';
  imageAPILink: any;
  isPhotoUploaded = false;
  loading = false;
  constructor(
    private imageCompressService: ImageCompressService,
    private commonService: CommonServicesService,
    private route: Router,
    private commonApiService: CommonServicesService
  ) {}

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
          this.route.navigate(['driver/myVehicle']);
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

  addPhoto() {
    console.log('click photo');
    this.loading = true;
    this.goAsDriver();
  }

  goAsDriver() {
    this.changeRole('Driver').then(() => {
      this.commonApiService.getUserProfileData().then((res: any) => {
        if (res.profile.is_vehicle_verified) {
          console.log('photo page');
          this.route.navigateByUrl('driver/driverDashboard');
          this.route.navigateByUrl('addPhoto');
        } else {
          this.route.navigateByUrl('driver/myVehicle');
          console.log('photo page');
          this.route.navigateByUrl('driver/addPhoto');
        }
        console.log(res);
      });
    });
  }
}
