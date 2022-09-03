import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { Product } from '../model/product.model';
import { StorageService } from 'src/app/services/_helpers/storage.service';
import { ChatusersService } from '../../chat-list/services/chatusers.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public products: Product[] = [];


  myItemsKey = 'myitems';

  constructor(
    public network: NetworkService,
    public storage: StorageService,
    public chatuserService: ChatusersService,
    public mapService: MapService,
  ) {
    // this.products = this.sampleData.map( product => new Product().deserialize(product) );
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

  public load(): Promise<Product[]> {
    return new Promise(resolve => {
      resolve(this.products);
    });
  }

  public loadOne(id): Promise<Product> {
    return new Promise(async resolve => {
      console.log('Form Product Service Id', id);
      // check alpha for debug purposes
      let response = await this.network.getProductById(id);
      resolve(response['product']);
    });
  }

  public model(value): Promise<Product> {
    return new Promise(resolve => {
      const product = new Product().deserialize(value);
      resolve(product);
    });
  }

  public addProduct(value): Promise<Product> {
    return new Promise(async resolve => {

      let product = new Product().deserialize(value);
      delete product['id'];

      // call api and add product
      console.log(product);
      let response = await this.network.postAddProduct(product);
      console.log(response);

      product = response['product'];
      // add the product on top of already fetched products 
      product.new = true;
      this.products.unshift(product);
      this.setMyProduct(product);
      console.log('ASSdJLAJ LJALKSJalkjSLKJLKASJ',product);
      
      resolve(product);
    });
  }

  public editProduct(value): Promise<Product> {
    return new Promise(async resolve => {

      // let product = new Product().deserialize(value);
      console.log(value);
      // call api and edit product
      let response = await this.network.postUpdateProduct(value);

      this.setMyProduct(value);
      resolve(value);

    });
  }

  public filterProduct(value): Promise<Product[]> {
    return new Promise(async resolve => {

      let filteredProducts = this.products.filter(x => {
        return x.category_id.includes(value);
      });

      resolve(filteredProducts);

    });
  }

  setMyProduct(item) {
    return new Promise(async resolve => {

      var allItems = await this.getAllMyItems() as Product[];
      let findindex = allItems.findIndex(x => x['id'] == item.id);
      if (findindex != -1) {
        allItems.splice(findindex, 1);
        this.setAllMyItems(allItems);
        resolve(true);

      } else {
        console.log('HERERERREERERRE');
        console.log(item);

        allItems.push(item);
        this.setAllMyItems(allItems);
        console.log(allItems);
        resolve(true);
      }

    });
  }

  getAllMyItems() {

    return new Promise(resolve => {
      this.storage.getKey(this.myItemsKey).then(v => {
        if (!v) {
          resolve([]);
        } else {
          let a = JSON.parse(v as string) as Product[];
          resolve(a);
        }
      });
    });

  }

  setAllMyItems(items) {
    return new Promise(resolve => {
      let allitems = JSON.stringify(items);
      this.storage.setKey(this.myItemsKey, allitems).then(v => {
        resolve(true);
      });
    });

  }

  getChatRoomOfProduct(item: Product): Promise<any> {

    return new Promise(async resolve => {

      let d = 0;
      // console.log(d);

      // resolve("k8k9CiVpIu9rqkriIUT8");

      // let roomId = await this.chatuserService.getChatRoom(d);
      // resolve(roomId);





      let response = await this.network.postGetProductChatRoom(d);
      console.log(response);


      if (response && response['room_id']) {
        resolve(response['room_id']);
      } else {
        resolve(null);
      }


    });
  }

  getMyItemsFromApi(): Promise<Product> {
    return new Promise(async resolve => {
      const response = await this.network.postGetMyItems();
      if (response) {
        const products = response['products'];
        resolve(products);
      }
    });
  }

  getProguctConditions(): Promise<any[]>{

    return new Promise(async resolve => {
      const response = await this.network.getProductConditions();
      if (response) {
        const conditions = response['conditions'];
        resolve(conditions);
      }
    });
  }

  getProductVehicles(): Promise<any[]>{

    return new Promise(async resolve => {
      const response = await this.network.getProductVehicleSize();
      if (response) {
        const sizes = response['sizes'];
        resolve(sizes);
      }
    });
  }
}
