import { Injectable } from '@angular/core';
import { Preference } from '../model/preference.model';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  public pref: Preference;
  constructor() { 
    this.pref = new Preference();
  }

  setCartCount(count){
    this.pref.cartCount = count;
  }

  getCartCount(){
    return this.pref.cartCount;
  }
}
