import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, keys: any[] ): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      console.log(it);
      console.log(keys);
      return this.isExistInKeys(searchText, it, keys);
    });
  }

  isExistInKeys(searchText, object, keys: any[]): boolean{

    let flag = false;

    for(var i = 0; i < keys.length; i++ ){
      if(object[keys[i]].toString().toLowerCase().includes(searchText)){
        flag = true;
        break;
      };
    }

    return flag;
  }

}
