import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { Category } from '../model/category.model';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: any[] = [];
  grouped_categories: any;
  constructor(public network: NetworkService) { }

  loadAll(): Promise<Category[]> {
    return new Promise(async resolve => {
      // get products from network
      let response = await this.network.postGetAllCategories();

      if (response) {
        let categories = response['categories'];
        console.log(response);
        this.categories = categories.map(category => new Category().deserialize(category));
        console.log(this.categories);

        // this.grouped_categories = _.groupBy(this.categories, 'type');
        // console.log(this.grouped_categories)
        // this.parseGroups(this.grouped_categories);
        resolve(this.categories);
      } else {
        resolve([]);
      }

    });
  }

  private parseGroups(categories) {

    var arr = [];
    Object.keys(categories).forEach(obj => {
      let objName = {};
      objName[obj] =  this.grouped_categories[obj];
      arr.push(objName);
    });
    this.grouped_categories = arr;
  }

  public getGroupedCategories() {
    return this.grouped_categories;
  }

  public getGroupedCategoriesKeys(){

    let arr = [];

    this.grouped_categories.forEach(element => {
      arr.push(Object.keys(element));
    });

    return arr;
  }



  public load(): Promise<Category[]> {
    return new Promise(resolve => {

      let cats = this.categories.map(cat => new Category().deserialize(cat));
      resolve(cats);
    })
  }


}
