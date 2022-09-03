import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/_helpers/storage.service';
import { Product } from '../model/product.model';
import { NetworkService } from 'src/app/services/_helpers/network.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  key = 'fav_items';
  products: Product[] = [];

  constructor(public storage: StorageService, public network: NetworkService) { 
    console.log("Fav Service Initialized");
    // this.getAllItemsFavorite();
  }

  loadAll(filters?): Promise<Product[]> {
    return new Promise(async resolve => {
      // get products from network
      let response = await this.network.postGetAllProducts(filters);
      if (response) {
        let products = response['products'];
        this.products = products.map(product => new Product().deserialize(product));
        resolve(this.products);
      } else {
        resolve([]);
      }

    });
  }

  toggleItemToFavorite(item: Product, flag = false){

    return new Promise( async resolve => {

      let data = {
        product_id: item.id,
        is_favorite: flag ? 1 : 0
      }
      
      this.network.postSetProductFavorite(data).then( data => {
        console.log(data);
        resolve(data['is_favorite'])
      })

      // var allItems = await this.getAllItemsFavorite() as Product[];      
      // // check if already in array 
      // // if yes remove it, if no then add it
      // let findindex = allItems.findIndex( x => x['id'] == item.id);
      // if(findindex != -1){

      //   if (!flag) {
      //     allItems.splice(findindex, 1)
      //     this.setAllItemsFavorite(allItems);
      //   }
        
      //   resolve(false);

      // }else{

      //   if(flag){
      //     allItems.push(item);
      //     this.setAllItemsFavorite(allItems);
      //   }

        
      //   resolve(true);
      // }

    })
    

  }

  getAllItemsFavorite(){
    return new Promise( resolve => {



      this.storage.getKey(this.key).then( v => {
        if(!v){
          resolve([]);
        }else{
          let a = JSON.parse( v as string ) as Product[];
          this.products = a;
          resolve( a );
        }
      });


    });
    
  }

  setAllItemsFavorite(items){
    return new Promise( resolve => {
      this.products = items;
      let allitems = JSON.stringify(items);
      this.storage.setKey(this.key, allitems).then( v => {
        resolve(true);
      });
    });
    
  }

  checkIfItemIsFavorite(item){

  }

  isItemAlreadyFavorite(id){
    return this.products.findIndex( x => x.id == id) != -1;
  }

  



}
