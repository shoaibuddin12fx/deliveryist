import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getData() {
    throw new Error('Method not implemented.');
  }
  saveData(obj: { lat: any; lng: any; add: any }) {
    throw new Error('Method not implemented.');
  }

  constructor() {}

  getKey(key) {
    return new Promise((resolve) => {
      const v = localStorage.getItem(key);
      resolve(v);
    });
  }

  setKey(key, value) {
    return new Promise((resolve) => {
      const v = localStorage.setItem(key, value);
      resolve(v);
    });
  }

  removeKey(key) {
    return new Promise((resolve) => {
      const v = localStorage.removeItem(key);
      resolve(v);
    });
  }

  clearAll() {
    return new Promise((resolve) => {
      const v = localStorage.clear();
      resolve(v);
    });
  }

  getSessionKey(key) {
    return new Promise((resolve) => {
      resolve(sessionStorage.getItem(key));
    });
  }

  setSessionKey(key, value) {
    return new Promise((resolve) => {
      resolve(sessionStorage.setItem(key, value));
    });
  }

  removeSessionKey(key) {
    return new Promise((resolve) => {
      resolve(sessionStorage.removeItem(key));
    });
  }

  clearAllSession() {
    return new Promise((resolve) => {
      resolve(sessionStorage.clear());
    });
  }
}
