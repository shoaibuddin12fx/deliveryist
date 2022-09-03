import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireAuth } from '@angular/fire/auth';

// import {
//   AngularFireDatabase,
//   AngularFireList,
//   AngularFireObject,
// } from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object


// import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
// import { Product } from 'src/app/pages/market-place/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productFolder = 'productImages';
  // productImagesCollectionRef: AngularFirestoreCollection<productImage>;
  public productImagesCollection: any[];
  // productImages: AngularFireList<any[]>;
  // productImagedetails: AngularFireObject<any>;
  productImageFolder: any;
  imageList: any;
  // productsCollectionRef: AngularFirestoreCollection<unknown>;
  products: any;

  constructor() {
    // this.imageList = this.af.list("/images") as AngularFireList<fbImage[]>
    // this.productImagesCollectionRef = this.afs.collection<productImage>('images');
    // this.productsCollectionRef = this.afs.collection<Product>('products');
  }

  initialize() {

  }

  // getTimeStamp() {
  //   return firebase.database.ServerValue.TIMESTAMP;
  // }

  async deleteImage(docId) {

    let flag = confirm('Are you sure you want to delete the image?');
    if (!flag) {
      return;
    }

    // let res = await this.afs.collection<productImage>('images').doc(docId).delete();
    let i = this.productImagesCollection.findIndex(x => x.$key == docId);
    if (i) {
      this.productImagesCollection.splice(i, 1);
    }

  }

  // getAllImages(itemId) {
  //   return new Promise(resolve => {
  //     this.afs.collection<productImage>('images', ref => ref.where('productId', '==', itemId)).snapshotChanges()
  //       .pipe(map((mutation: any[]) => mutation.map(p => {
  //         console.log(p);
  //         return { ...p.payload.doc.data(), 'id': [p.payload.doc.id][0] };
  //       })))
  //       .subscribe(v => {
  //         console.log(v);
  //         this.productImagesCollection = v;
  //         resolve();
  //       });
  //   });
  // }

  uploadProductImageAndGetRef(file) {

    return new Promise(resolve => {

    //   let timestamp = Date.parse(Date());
    //   // let storageRefItem = firebase.storage().ref();
    //   let pathItem = `/images/${this.productFolder}/${timestamp}-${file.name}`;

    //   // let iRefItem = storageRefItem.child(pathItem);
    //   iRefItem.put(file).then((snapshot) => {

    //     iRefItem.getDownloadURL().then((url) => {
    //       let obj = {
    //         url: url,
    //         name: `${timestamp}-${file.name}`
    //       };
    //       console.log(obj);
    //       resolve(obj);
    //     })
    //       .catch((error) => {
    //         resolve(null);
    //       });
    //   });

    });

  }

  uploadImagesUrls(obj) {

    return new Promise(resolve => {

    //   this.afs.collection('products').doc(obj['product_id']).update({
    //     photos_url: obj['urls'],
    //   }).then(res => {
    //     resolve(true);
    //   }).catch(error => {
    //     console.log(error);
    //   });
    });
  }

  // uploadProductImageLinkAndGetRef(obj) {
  //   return new Promise(async resolve => {

  //     var _obj = obj;
  //     _obj['timestamp'] = this.getTimeStamp();
  //     let response = await this.productImagesCollectionRef.add(_obj);
  //     resolve(response);

  //   });
  // }

  // deleteImageFromDb(name) {
  //   return new Promise(resolve => {

  //     const storageRefItem = firebase.storage().ref();
  //     const pathItem = `/images/${this.productFolder}/${name}`;

  //     let iRefItem = storageRefItem.child(pathItem);
  //     iRefItem.delete().then((snapshot) => {
  //       resolve(true);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   });
  // }

 
}




// export interface productImage {
//   $key?: string;
//   name?: string;
//   type?: string;
//   firebase_url?: string;
//   productId?: string;
//   ownerId?: string;
//   timestanp?: string;
// }
