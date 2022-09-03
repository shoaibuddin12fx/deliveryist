import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/pages/market-place/model/product.model';
import { NetworkService } from 'src/app/services/_helpers/network.service';



export interface productImage {
  $key?: string;
  name?: string;
  type?: string;
  firebase_url?: string;
  productId?: string;
  ownerId?: string;
  timestanp?: string;
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseImagesService {

  productFolder = 'productImages';
 
  public productImagesCollection: any[];
  productImageFolder: any;
  imageList: any;
  products: any;

  constructor(public network: NetworkService) {
    // this.imageList = this.af.list("/images") as AngularFireList<fbImage[]>
    
  }

  initialize() {

  }

  getTimeStamp() {
    // return firebase.database.ServerValue.TIMESTAMP;
  }

  async deleteImage(docId) {

    let flag = confirm('Are you sure you want to delete the image?');
    if (!flag) {
      return;
    }

    // let res = await this.afs.collection<productImage>('images').doc(docId).delete();
    // let i = this.productImagesCollection.findIndex(x => x.$key == docId);
    // if (i) {
    //   this.productImagesCollection.splice(i, 1);
    // }

  }

  getAllImages(itemId) {
    // return new Promise(resolve => {
    //   this.afs.collection<productImage>('images', ref => ref.where('productId', '==', itemId)).snapshotChanges()
    //     .pipe(map((mutation: any[]) => mutation.map(p => {
    //       console.log(p);
    //       return { ...p.payload.doc.data(), 'id': [p.payload.doc.id][0] };
    //     })))
    //     .subscribe(v => {
    //       console.log(v);
    //       this.productImagesCollection = v;
    //       resolve();
    //     });
    // });
  }

  uploadProductImageAndGetRef(file) {

    return new Promise(resolve => {

      this.network.postSingleFileUpload(file).then( obj => {
          console.log(obj);
          resolve(obj);
      }).catch((error) => {
        resolve(null);
      });

    });

  }

  uploadImagesUrls(obj) {

    return new Promise(resolve => {

      // this.afs.collection('products').doc(obj['product_id']).update({
      //   photos_url: obj['urls'],
      // }).then(res => {
      //   resolve(true);
      // }).catch(error => {
      //   console.log(error);
      // });
    });
  }

  uploadProductImageLinkAndGetRef(obj) {
    return new Promise(async resolve => {

      // var _obj = obj;
      // _obj['timestamp'] = this.getTimeStamp();
      // let response = await this.productImagesCollectionRef.add(_obj);
      // resolve(response);

    });
  }

  deleteImageFromDb(name) {
    return new Promise(resolve => {

      // const storageRefItem = firebase.storage().ref();
      // const pathItem = `/images/${this.productFolder}/${name}`;

      // let iRefItem = storageRefItem.child(pathItem);
      // iRefItem.delete().then((snapshot) => {
      //   resolve(true);
      // }).catch((error) => {
      //   console.log(error);
      // });
    });
  }
}
