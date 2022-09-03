import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { BasePage } from '../pages/base-page/base-page';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BasePage{

  constructor(injector:Injector) { 
    super(injector);
  }

  // getChatList():Promise<any[]>{
  //   return new Promise((resolve,reject)=>{

  //   })
  // }
}
