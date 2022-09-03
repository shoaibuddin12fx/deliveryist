import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { StorageService } from './storage.service';
import { UtilityService } from './utility.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    public utility: UtilityService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('itercept');
    return from(this.storage.getKey('token')).pipe(
      switchMap((token) => {
        console.log('bearer token', token);
        const cloneRequest = this.addSecret(req, token);
        return next.handle(cloneRequest);
      })
    );
  }

  // will be used later for google login
  private addSecret(request: HttpRequest<any>, value: any) {
    let v = value ? value : localStorage.getItem('token');

    let obj = {
      Authorization: 'Bearer ' + v,
    };

    obj['Accept'] = 'application/json';
    let cnt = request.headers.get('Content-Type');
    if (cnt == 'application/json') {
      obj['Content-Type'] = request.headers.get('Content-Type');
    }

    console.log(obj);
    const clone = request.clone({
      setHeaders: obj,
    });

    return clone;
  }
}
