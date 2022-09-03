import { ProductService } from './../services/product.service';
import { CategoryService } from './../services/category.service';
import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  Injector,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
// import * as M from 'materialize-css/dist/js/materialize.min.js';
// import 'materialize-css';
import { BasePage } from '../../base-page/base-page';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { MapService } from './../services/map.service';
import { ProductmapService } from '../services/productmap.service';
import { ImageCompressionService } from '../services/image-compression.service';
// import { MaterializeAction } from 'angular2-materialize';
import { ActionSheetController } from '@ionic/angular';

// import { FirebaseImagesService } from 'src/app/helpers/firebase/firebase.images.service';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss', './ng-tag-input.scss'],
})
export class AddEditProductComponent
  extends BasePage
  implements OnInit, AfterViewInit
{
  modalActions = new EventEmitter<string>(); //  | MaterializeAction
  @ViewChild('fileupload', { static: true })
  fileupload: ElementRef<HTMLElement>;
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
  @Output('finishUpload') finishUpload: EventEmitter<any> =
    new EventEmitter<any>();

  public categories: Category[] = [];
  category = 'Select Category';
  selectedCategory = -1;

  public conditions: any[] = [];
  condition = 'Select Conditions';
  selectedCondition = -1;

  public vehicleSizes: any[] = [];
  vehiclesize = 'Select Vehicle';
  selectedSize = -1;

  // modal paramaeters to set
  modal_header = '';
  modal_options = [];
  firebaseUrls: any[];

  constructor(
    injector: Injector,
    public categoryService: CategoryService,
    public productService: ProductService,
    public formBuilder: FormBuilder,
    public map: MapService,
    // public fb: FirebaseImagesService,
    public utility: UtilityService,
    public mapService: MapService,
    public productmapService: ProductmapService,
    public compressorService: ImageCompressionService,
    public actionSheetController: ActionSheetController
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setupForm();
  }

  initializeModal() {
    // const options = {};
    // var elems = document.querySelector('#model1');
    // var instances = M.Modal.init(elems, options);
    // return instances;
  }

  ngAfterViewInit() {
    this.initializeChips();
  }

  async setupForm() {
    this.aForm = this.getRow();
    let obj = await this.productmapService.getCoords();
    this.categories = await this.categoryService.loadAll();
    this.conditions = await this.productService.getProguctConditions();
    this.vehicleSizes = await this.productService.getProductVehicles();

    console.log(this.categories);
    console.log(obj);
    // call map service and fetch current lat long with address and set it into form controls
    this.itemId = this.getParams().itemId ? this.getParams().itemId : '';

    if (this.itemId != '') {
      await this.getItemById(this.itemId);
      this.isEdit = true;
      console.log(this.isEdit);
    } else {
      this.f.latitude.setValue(obj['lat']);
      this.f.longitude.setValue(obj['lng']);
    }
  }

  getItemById(id) {
    return new Promise(async (resolve) => {
      const self = this;
      this.item = await this.productService.loadOne(id);
      this.f.name.setValue(this.item.name);
      this.f.description.setValue(this.item.description);
      this.f.price.setValue(this.item.price);

      this.f.extra_labels.setValue(this.item.extra_labels);
      this.f.latitude.setValue(this.item.latitude);
      this.f.longitude.setValue(this.item.longitude);
      this.f.brand.setValue(this.item.brand);
      this.setEditData('category', this.item.category_id);
      this.setEditData('condition', this.item.condition_id);
      this.setEditData('size', this.item.vehicle_id);

      // let cats = this.categoryService.categories.find( x => x.id == item.category_id);
      // console.log("item => ", item);

      // if (cats) {
      //   console.log("cats =< ", cats);
      //   this.category = cats.name;
      //   this.selectedCategory = cats.id;
      //   this.f.category_id.setValue(cats.id);
      // } else {
      //   this.category = 'Select Category';
      //   this.selectedCategory = -1;
      //   this.f.category_id.setValue(null);
      // }

      //await this.productmapService.getGeoAddress({lat: item.latitude, lng: item.longitude })

      /******************************** SETTING IMAGES FOR EDIT  ***********************************/
      console.log(this.item.photos_urls);

      for (let image of this.item.photos_urls) {
        this.url = image;
        console.log('imageFB', image.firebase_url);
        var obj = {
          link: image.firebase_url,
          name: null,
          file: null,
          progress: false,
          uploaded: false,
          selected: false,
        };

        obj.link = image.firebase_url;
        obj.uploaded = true;
        obj.name = image.name;

        this.urls.push(obj);
      }

      console.log(this.url);
      // set categories data
      // const catdata = [];
      // console.log(item.category);
      // for (let i = 0; i < item.category.length; i++) {
      //   catdata[i] = { tag: item.category[i] };
      // }

      // set extralabel data
      const exdata = [];
      console.log(this.item.extra_labels);
      const parseExtraLabels = JSON.parse(this.item.extra_labels);
      for (let i = 0; i < parseExtraLabels.length; i++) {
        exdata[i] = { tag: parseExtraLabels[i] };
      }

      this.initializeChips(exdata);
    });
  }

  getRow() {
    return this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z0-9 ]*$/),
        ]),
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      category_id: [''],
      condition_id: [''],
      brand: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z ]*$/),
        ]),
      ],
      vehicle_id: [''],
      description: ['', Validators.compose([Validators.required])],
      extra_labels: [''],
      latitude: ['', Validators.compose([Validators.required])],
      longitude: ['', Validators.compose([Validators.required])],
    });
  }

  get f() {
    return this.aForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.aForm.invalid) {
      console.log(this.aForm.value);
      this.utility.presentAlert('Invalid Form');
      return;
    }
    console.log('submitting');
    this.firebase_url = await this.uploadfiles(this.link);

    console.log(this.firebase_url);

    // const tags = []
    // this.input.forEach(tag => {
    //   tags.push(tag.value)
    // });
    // console.log(tags)

    // console.log(_urls);

    const formdata = this.aForm.value;
    console.log(formdata);

    // console.log(_urls);
    formdata.photos_urls = this.firebase_url;
    formdata.extra_labels = this.tags;
    console.log(formdata.photo_urls);
    if (this.itemId) {
      formdata.product_id = this.itemId;
      this.editProduct(formdata);
    } else {
      console.log(formdata);
      this.addProduct(formdata);
    }
  }

  async addProduct(formdata) {
    formdata = new Product().deserialize(formdata);
    const newproduct = await this.productService.addProduct(formdata);
    console.log(newproduct);

    this.itemId = newproduct.id;
    this.location.back();
  }

  async editProduct(formdata) {
    formdata = new Product().deserialize(formdata);
    console.log('Edit Form Data', formdata);
    console.log('Current Item ID', this.itemId);
    console.log('Form Data Item ID', formdata.productId);

    const editproduct = await this.productService.editProduct(formdata);
    console.log('Console Log From Add Edit Product Component', editproduct);
  }

  initializeChips(data = []) {
    // const options = {
    //   data: data
    // };
    // const elems = document.querySelector('.tag-chips');
    // this.tagpicker = M.Chips.init(elems, options);
  }

  tagInstance() {
    return document
      .querySelector('.tag-chips')
      ['M_Chips'].chipsData.map((x) => x.tag);
  }

  categoryInstance() {
    return document
      .querySelector('.cat-chips')
      ['M_Chips'].chipsData.map((x) => x.tag);
  }

  openFile() {
    let el: HTMLElement = this.fileupload.nativeElement;
    el.click();
  }

  onSelectFile(event) {
    // this.urls = [];
    // this.files = [];
    let self = this;

    let files = event.target.files;
    console.log(files);
    if (files) {
      if (files.length > 10) {
        this.utility.presentAlert('Only Ten Images can be added');
        return;
      }

      for (let file of files) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e: any) => {
          let compressImages = e.target.result;

          this.link = await this.compressorService.compressImage(
            compressImages
          );
          this.firebase_url = this.link;
          console.log(this.firebase_url);
          this.url = await this.SendImages(this.firebase_url);
          console.log(this.url);
          this.urlLinks.push(this.url.url);
          console.log(this.url);
          this.links.push(this.url.url);

          // let findIndex = this.urls.findIndex(x => {
          //   return x.link == '/assets/images/CameraUploadImage.svg';
          // });

          // if (findIndex != -1) {
          let obj = {};
          obj['link'] = this.link;
          obj['selected'] = true;
          obj['file'] = file;
          obj['name'] = file.name;
          obj['uploaded'] = false;

          if (this.urls.length < 10) {
            this.urls.push(obj);
            this.files.push(file);
          }

          // }
        };
        // this.urls[i].file = file;
      }
    }
  }

  async uploadfiles(urls) {
    return new Promise(async (resolve) => {
      let link = await this.network.postSingleFileUpload(urls);

      console.log(link);
      var self = this;
      console.log(this.files);

      if (!this.itemId) {
        if (this.files.length < 1) {
          this.utility.presentAlert('Please Add Images');
          return;
        }
      }

      this.firebaseUrls = [];
      console.log(this.files);
      // let uid = await this.utility.returnCurrentUserUid();
      console.warn(self.urls);

      for (var i = 0; i < this.urls.length; i++) {
        let _url = self.urls[i];
        _url.progress = true;
        // let link = await this.fb.uploadProductImageAndGetRef(_url['link']);
        _url.progress = false;

        console.log(link);
        let obj = {
          name: link['name'],
          type: 'product',
          firebase_url: link['url'],
          productId: this.itemId,
        };

        console.log(obj);
        this.firebaseUrls.push(obj);
      }

      if (this.itemId) {
        console.log('Item Is On Edit');
        let findIndex = this.urls.findIndex((x) => {
          return x.uploaded == true;
        });

        console.log(this.urls);
        console.log(this.urls[findIndex]);
        // NEED A WORK AROUND FOR UPLOADING IMAGES EVEN IF A NEW IMAGE HASNT BEEN UPLOADED
        if (this.urls[findIndex]) {
          if (this.urls[findIndex].uploaded === true) {
            let obj = {
              name: this.urls[findIndex]['name'],
              type: 'product',
              firebase_url: this.urls[findIndex]['link'],
              productId: this.itemId,
            };
            this.firebaseUrls.push(obj);
          }
        }
      }

      resolve(this.firebaseUrls);
    });
  }

  async deleteImage(id) {
    // await this.fb.deleteImage(id);
    // this.fb.getAllImages(this.itemId);
  }

  async deleteImageFromdb(url) {
    // const response = await this.fb.deleteImageFromDb(url.name);
    // if (response == true) {
    //   await this.fb.deleteImage(url.id);
    // }
    // this.firebaseUrls = [];
    // console.log('Conole Log Before Fire Store Image Collection', this.fb.productImagesCollection);
    // for (let i = 0; i < this.fb.productImagesCollection.length; i++) {
    //   const images = this.fb.productImagesCollection[i];
    //   this.firebaseUrls.push(images.firebase_url);
    // }
    // console.log('Conole Log After Fire Store Image Collection', this.fb.productImagesCollection);
    // console.log(this.firebaseUrls);
    // let obj = {
    //   product_id: this.itemId,
    //   urls: this.firebaseUrls,
    // };
    // console.log(obj);
    // const response2 = await this.fb.uploadImagesUrls(obj);
    // this.fb.getAllImages(this.itemId);
  }
  justDelete(i) {
    if (this.urls[i].uploaded == true) {
      console.log(this.urls[i]);

      let flag = confirm('Are you sure you want to delete the image?');
      if (!flag) {
        return;
      }
      this.urls.splice(i, 1);
      let obj = {
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

  async openModal(key) {
    this.setModalData(key);
    // // this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    // // this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  setCategory(obj) {
    this.closeModal();
    this.category = obj.name;
    this.selectedCategory = obj.id;
    this.aForm.controls.category_id.setValue(obj.id);
  }

  setEditData(key, id) {
    var item;
    if (!id) {
      return;
    }
    switch (key) {
      case 'category':
        item = this.categories.find((x) => {
          return x['id'] == id;
        });

        item['key'] = key;
        this.setModalOption(item);

        break;
      case 'condition':
        item = this.conditions.find((x) => {
          return x['id'] == id;
        });

        item['key'] = key;
        this.setModalOption(item);

        break;
      case 'size':
        item = this.vehicleSizes.find((x) => {
          return x['id'] == id;
        });

        item['key'] = key;
        this.setModalOption(item);

      default:
        break;
    }
  }

  setModalData(key) {
    switch (key) {
      case 'category':
        this.modal_header = 'Select Category';
        this.modal_options = this.categories.map((x) => {
          x['key'] = key;
          return x;
        });

        break;
      case 'condition':
        this.modal_header = 'Select Condition';
        this.modal_options = this.conditions.map((x) => {
          x['key'] = key;
          return x;
        });

        break;
      case 'size':
        this.modal_header = 'Select Vehicle';
        this.modal_options = this.vehicleSizes.map((x) => {
          x['key'] = key;
          return x;
        });

      default:
        break;
    }
  }

  onChangeCategory(event) {
    this.category = event.target.value['name'];
    this.selectedCategory = event.target.value['id'];
    console.log(this.selectedCategory);
    this.aForm.controls.category_id.setValue(event.target.value['id']);
  }

  onChangeCondition(event) {
    this.condition = event.target.value['name'];
    this.selectedCondition = event.target.value['id'];
    this.aForm.controls.condition_id.setValue(event.target.value['id']);
  }

  onChangeVehicles(event) {
    this.vehiclesize = event.target.value['name'];
    this.selectedSize = event.target.value['id'];
    this.aForm.controls.vehicle_id.setValue(event.target.value['id']);
  }

  setModalOption(item) {
    console.log(item);
    let key = item['key'];
    switch (key) {
      case 'category':
        this.category = item.name;
        this.selectedCategory = item.id;
        this.aForm.controls.category_id.setValue(item.id);

        break;
      case 'condition':
        this.condition = item.name;
        this.selectedCondition = item.id;
        this.aForm.controls.condition_id.setValue(item.id);

        break;
      case 'size':
        this.vehiclesize = item.name;
        this.selectedSize = item.id;
        this.aForm.controls.vehicle_id.setValue(item.id);

      default:
        break;
    }

    this.closeModal();
  }

  addTags() {
    console.log(this.aForm.controls['extra_labels'].value);
    let value = this.aForm.controls['extra_labels'].value;
    if (!this.tags.includes(value)) {
      this.tags.push(value);
    }
    this.aForm.controls['extra_labels'].setValue('');
  }

  deleteTag(tag) {
    let valueToDeleteIndex = this.tags.indexOf(tag);
    this.tags.splice(valueToDeleteIndex, 1);
    console.log(this.tags);
    console.log('deleted');
  }

  async SendImages(urls) {
    return this.network.postSingleFileUpload(urls);
  }
}
