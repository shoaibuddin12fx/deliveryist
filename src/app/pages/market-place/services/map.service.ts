import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/_helpers/storage.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public address;
  public currLat;
  public currLng;
  public radial_distance = 16093;
  public location_block = '';
  public radiusType = '1';
  constructor(
    public storage: StorageService,
    // public events: NgxPubSubService
  ) {

    this.initialize();
  }

  async initialize() {
    return new Promise(resolve => {
      this.getCurrentPosition().then(async v => {
        let address = await this.getGeoAddress(v);
        resolve(address);
      });
    })
  }

  returnPiDistance(distance) {
    return distance * (Math.PI / 2)
  }

  public async getStorageRadialDistance() {
    let value = await this.storage.getKey('radial_distance');
    this.radial_distance = value as number;

  }

  public getRadialDistance() {
    return this.radial_distance;
  }

  public setRadialDistance(value) {
    // set to storage as well
    this.storage.setKey('radial_distance', value);
    this.radial_distance = value;

  }

  setLatlng(obj) {
    this.currLng = obj['lng'];
    this.currLat = obj['lat'];
    const coords = { lat: this.currLat, lng: this.currLng };
    console.log(coords);
    this.getGeoAddress(coords).then(address => {
      console.log(address);
    });
  }

  calculateDistance(obj) {
    const R = 6371e3; // metres
    const φ1 = obj.currLat * Math.PI / 180; // φ, λ in radians
    const φ2 = obj.productLat * Math.PI / 180;
    const Δφ = (obj.productLat - obj.currLat) * Math.PI / 180;
    const Δλ = (obj.productLng - obj.currLng) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metre
    console.log(d);
    return d;
  }

  getCoords() {
    return new Promise(async (resolve) => {
      if (!this.currLng && !this.currLat) {
        const obj = await this.getCurrentPosition();
        obj['address'] = await this.getGeoAddress(obj);
        this.address = obj['address'];
        console.log(obj);
        resolve(obj);
      } else if (this.currLat && this.currLng) {
        const obj = {
          lng: this.currLng,
          lat: this.currLat,
          address: this.address ? this.address : '',
        };
        resolve(obj);
      }
    });
  }

  getCurrentPosition(): Promise<any> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        this.currLat = resp.coords.latitude;
        this.currLng = resp.coords.longitude;
        resolve({ lng: this.currLng, lat: this.currLat });
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
        if (status === 'OK') {
          if (results[0]) {
            console.log(results[0]);

            let f = results[0]['address_components'].find(x => {
              if (x.types.includes('route')) {
                return x.types.includes('route');
              } else {
                return x.types.includes('premise');
              }
            });

            let p = results[0]['address_components'].find(x => {
              return x.types.includes('political');
            });
            self.location_block = `${ f ? f.short_name : ''}, ${p ? p.short_name : ''}`;
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
      if (this.currLat && this.currLng) {
        const obj = {
          coordinates: { lat: this.currLat, lng: this.currLng },
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
          const address = await this.getGeoAddress(coordinates);
          this.address = address;
          obj['address'] = address;
          resolve(obj);
        }).catch(error => {
          console.log(error);
          resolve(null);
        });
      }
    });
  }

  setRadiusInMiles(meters) {
    return Math.round(meters / 1609.34);
  }


}
