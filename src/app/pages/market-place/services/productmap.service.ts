import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/_helpers/storage.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class ProductmapService {

  public address;
  public productLat;
  public productLng;
  public location_block = '';

  constructor(
    public storage: StorageService,
  ) {
    this.getCurrentPosition().then(v => {
      //this.getGeoAddress(v);
    });
  }

  getCoords() {
    return new Promise(async (resolve) => {
      if (!this.productLng || !this.productLat) {
         const obj = await this.getCurrentPosition();
         resolve(obj)
      } else if (this.productLat && this.productLng) {
        const obj = {
          lng: this.productLng,
          lat: this.productLat,
        };
        resolve(obj);
      }
    });
  }

  setLatlng(obj) {
    this.productLng = obj['lng'];
    this.productLat = obj['lat'];
    const coords = { lat: this.productLat, lng: this.productLng };
    console.log(coords);
    /*
    this.getGeoAddress(coords).then(address => {
      console.log(address);
    });
    */
  }

  getCurrentPosition(): Promise<any> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        this.productLat = resp.coords.latitude;
        this.productLng = resp.coords.longitude;
        console.log(this.productLat);
        console.log(this.productLng);

        resolve({ lng: this.productLng, lat: this.productLat });
      },
        err => {
          reject(err);
        });
    });

  }

  public getGeoAddress(coords) {
    const self = this;
    const geocoder = new google.maps.Geocoder;
    const latlng = coords;
    return new Promise(resolve => {
      geocoder.geocode({ 'location': latlng }, function (results, status) {
        console.log(latlng)
        if (status === 'OK') {
          console.log(results)
          if (results[0]) {
            console.log(results);
            let f = results[0]['address_components'].find(x => {
              if (x.types.includes('route')) {
                return x.types.includes('route');
              } else {
                return x.types.includes('premise');
              }
            });

            let p = results[0]['address_components'].find(x => {
              return  x.types.includes('political');
            });

            self.location_block = `${ f ? f.short_name : ''}, ${p ? p.short_name : ''}`;
            console.log(self.location_block);
            self.address = results[0].formatted_address;
            // self.location_block = results[0].formatted_address;
          }
        }
        resolve(self.address);

      });
    });
  }

  public getAddress() {

    return new Promise(resolve => {
      if (this.productLat && this.productLng) {
        const obj = {
          coordinates: { lat: this.productLat, lng: this.productLng },
          address: this.address
        };
        console.log(obj);
        resolve(obj);
      } else {
        this.getCurrentPosition().then(async coordinates => {
          console.log(coordinates);
          const obj = {
            coordinates: coordinates
          };
  //        c                                                                                                                                                                                                                                                                                                                                                                       onst address = await this.getGeoAddress(coordinates);
    //      this.address = address;
      //    obj['address'] = address;
          resolve(obj);
        }).catch(error => {
          console.log(error);
          resolve(null);
        });
      }
    });
  }

}
