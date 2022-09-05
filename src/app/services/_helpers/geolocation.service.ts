import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ProductMapPageComponent } from 'src/app/pages/market-place/product-map-page/product-map-page.component';
declare let google;

@Injectable({
  providedIn: 'root',
})
export class GeolocationsService {
  constructor(private geolocation: Geolocation) {}

  getDistanceOfCoordinates(origin, destination) {
    return new Promise((resolve) => {
      const service = new google.maps.DistanceMatrixService();
      const origin1 = new google.maps.LatLng(origin.lat, origin.lng);
      // let origin1 = new google.maps.LatLng(24.9091488,  67.104036);
      const destinationB = new google.maps.LatLng(
        destination.lat,
        destination.lng
      );
      service.getDistanceMatrix(
        {
          origins: [origin1],
          destinations: [destinationB],
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {

          console.log(status)
          if(status == 'OK'){

            let obj = {
              distance: response.rows[0].elements[0].distance.text,
              duration: response.rows[0].elements[0].duration.text
            }

            resolve(obj);
          } else{
            resolve(null);
          }

        }
      );
    });
  }

  getCurrentLocationWithAddressWeb() {
    return new Promise(async (resolve) => {
      const coords = await this.getCurrentPositionWeb();
      if (coords) {
        const address = await this.getGeoAddress(coords);
        resolve({
          coords,
          address,
        });
      } else {
        resolve(null);
      }
    });
  }

  getCurrentPositionWeb(): Promise<any> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (resp) => {
          const coords = {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude,
          };
          resolve(coords);
        },
        (err) => {
          resolve(null);
        }
      );
    });
  }

  public getGeoAddress(coords) {
    const self = this;
    const geocoder = new google.maps.Geocoder();
    const latlng = coords;

    console.log(latlng);
    return new Promise((resolve) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        console.log(latlng);

        if (status !== 'OK') {
          resolve(null);
          return;
        }
        if (status === 'OK') {
          console.log(results);
          if (results[0]) {
            console.log(results);
            // let f = results[0]['address_components'].find((x) => {
            //   if (x.types.includes('route')) {
            //     return x.types.includes('route');
            //   } else {
            //     return x.types.includes('premise');
            //   }
            // });

            // let p = results[0]['address_components'].find((x) => {
            //   return x.types.includes('political');
            // });

            // self.location_block = `${f ? f.short_name : ''}, ${
            //   p ? p.short_name : ''
            // }`;
            // console.log(self.location_block);
            const address = results[0].formatted_address;
            resolve(address);
            // self.location_block = results[0].formatted_address;
          }
        } else {
          resolve(null);
          return;
        }
      });
    });
  }

  getCoordsForGeoAddress(address, _default = true) {
    return new Promise((resolve) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const loc = results[0].geometry.location;
            const lat = loc.lat();
            const lng = loc.lng();
            resolve({ lat, lng });
          } else {
            resolve(null);
          }
        } else {
          console.log({ results, status });
          resolve(null);
        }
      });
    });
  }

  getCoordsForPlaceId(placeId, _default = true) {
    return new Promise((resolve) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const loc = results[0].geometry.location;
            const lat = loc.lat();
            const lng = loc.lng();
            resolve({ lat, lng });
          } else {
            resolve(null);
          }
        } else {
          console.log({ results, status });
          resolve(null);
        }
      });
    });
  }

  getCoordsViaHTML5Navigator() {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(pos);
          },
          () => {
            resolve({ lat: 51.5074, lng: 0.1278 });
          }
        );
      } else {
        // Browser doesn't support Geolocation
        resolve({ lat: 51.5074, lng: 0.1278 });
      }
    });
  }

  getCurrentLocationCoordinates() {
    return new Promise(async (resolve) => {
      const coords = await this.geolocation.getCurrentPosition();

      const lt = coords.coords.latitude;
      const lg = coords.coords.longitude;

      resolve({ lat: lt, lng: lg });
    });
  }
}
