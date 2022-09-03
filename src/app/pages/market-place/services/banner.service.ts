import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { Banner } from '../model/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private sampleData = [
    {
      id: 1,
      name: 'banner 1',
      image: 'assets/images/banner1.jpg'
    },
    {
      id: 2,
      name: 'banner 2',
      image: 'assets/images/banner1.jpg'
    },
    {
      id: 3,
      name: 'banner 3',
      image: 'assets/images/banner1.jpg'
    },
    {
      id: 4,
      name: 'banner 4',
      image: 'assets/images/banner1.jpg'
    },
    {
      id: 5,
      name: 'banner 5',
      image: 'assets/images/banner1.jpg'
    },
    {
      id: 6,
      name: 'banner 6',
      image: 'assets/images/banner1.jpg'
    },
    {
      id: 7,
      name: 'banner 7',
      image: 'assets/images/banner1.jpg'
    }
  ]
  constructor(public network: NetworkService) { }

  public load(): Promise<Banner[]> {
    return new Promise( resolve => {

      let cats = this.sampleData.map( cat => new Banner().deserialize(cat) );
      resolve(cats);
    })
  }
}
