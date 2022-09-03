import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { errorMessages } from 'src/app/helpers/error_messages';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { ProfileService } from '../../services/profile.service';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { ImageCompressionService } from '../../services/image-compression.service';
@Component({
  selector: 'app-profile-pic-selection',
  templateUrl: './profile-pic-selection.component.html',
  styleUrls: ['./profile-pic-selection.component.scss'],
})
export class ProfilePicSelectionComponent extends BasePage implements OnInit {

  constructor(injector: Injector, public modalController: ModalController, public commonService: CommonServicesService, public profileService: ProfileService, public networkService: NetworkService, private camera: Camera, public compressService: ImageCompressionService) {
    super(injector);
    this.commonService.getUserProfileData().then((data: any) => {
      this.profileData = data.profile;
      console.log(this.profileData);
    }).catch(err => { errorMessages.ERROR_FETCHING_PROFILE });
  }

  public profileData;
  public inputFile;
  public mimeType;
  public image
  link;
  userData;
  @ViewChild('fileupload', { static: true }) fileupload: ElementRef<HTMLElement>;
  ngOnInit() {
    console.log("here")
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  removePhoto() {
    const pictureLink = {
      profile_pic: null
    };
    this.commonService.updateUserProfile(pictureLink).then((res: any) => {
      this.profileData = res.profile;
      // this.closeModal('modalProfilePic');
    }).catch(err => {
      errorMessages.ERROR_EDIT_PROFILE;
    });
  }
  public AddPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let url: any = await this.SendImages(base64Image);
      this.setUserData(url);
      this.commonService.updateUserProfile(this.userData).then(data => {
        console.log(data);
      })
    }, (err) => {
      // Handle error
    });
  }

  openFile() {
    let el: HTMLElement = this.fileupload.nativeElement;
    el.click();
  }

  onSelectFile(event) {

    console.log(event)
    let file = <File>event.target.files[0];
    if (file) {

      this.inputFile = file;
      this.mimeType = file.type;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e: any) => {
        this.image = e.target.result;
        this.link = await this.compressService.compressImage(this.image);
        let url: any = await this.SendImages(this.link);
        this.setUserData(url);
        this.commonService.updateUserProfile(this.userData).then(data => {
          console.log(data);
        })
      }
      console.log(file);
    }
  }

  setUserData(url) {
    this.userData =
    {
      'first_name': this.profileData.full_name.split(' ')[0],
      'last_name': this.profileData.full_name.split(' ')[1],
      'email': this.profileData.email.toLowerCase(),
      // 'countryCode': new FormControl(null, [Validators.required]),
      'contact': this.profileData.contact,
      // 'address': profileData.state,
      'age': this.profileData.age,
      'gender': this.profileData.gender,
      'street': this.profileData.street,
      'state': this.profileData.state,
      'city': this.profileData.city,
      'unit': this.profileData.unit,
      'zip': this.profileData.zip,
      'profile_pic': url.url
    }
  }
  async SendImages(urls) {
    return this.network.postSingleFileUpload(urls)
  }
}
