import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { NetworkService } from 'src/app/services/_helpers/network.service';

export interface chatMessage{
  $key?: string;
  ownerId?: string;
  message?: string;
  timestamp?: any;  
};


@Injectable({
  providedIn: 'root'
})
export class LiveChatService {

  public uid; 
  roomId;
  public chatMessageCollection: any[];

  


  constructor(public utility: UtilityService, 
    public network: NetworkService,    
    ) { 
    this.initialize();
  }

  async initialize(){
    this.uid = await this.utility.returnCurrentUserUid();

    // let _email = "shoaibuddin12fx@gmail.com";
    // let _pass = "hotmail1VU";
    // // let _email = "alikhan@mailinator.com";
    // // let _pass = "12345678";
    // // let response = await this.fb.loginStaticEmailUser();
    // // console.log(response);
    // // temp set room id as k8k9CiVpIu9rqkriIUT8
    // // let _temp = "k8k9CiVpIu9rqkriIUT8"
    // this.afAth.signInWithEmailAndPassword(_email, _pass).then( v => {
    //   console.log(v);
    //   this.chatMessageCollectionRef = this.afs.collection<chatMessage>('rooms/' + this.roomId + '/messages', ref => ref.orderBy('timestamp'));
    // })

    
  }

  getRoomId(){
    return this.roomId;
  }

  setRoomId(roomId){
    console.log(roomId);
    this.roomId = roomId; 
    this.setListListener()
    
  }

  setListListener() {
    // temp set room id as k8k9CiVpIu9rqkriIUT8
    // let _temp = "k8k9CiVpIu9rqkriIUT8"
    console.log(this.roomId);
    this.network.postGetAllRoomMessage(this.roomId).then(v => {
      this.chatMessageCollection = v['list'];
      this.uid = v['current_uid'];
      console.log(this.uid)
    })

    // this.afs.collection<chatMessage>('rooms/' + this.roomId + '/messages', ref => ref.orderBy('timestamp') ).valueChanges().subscribe( list => {
    //   this.chatMessageCollection = list;
    //   console.log(list);
    // })

  }

  getTimeStamp() {
    // return firebase.database.ServerValue.TIMESTAMP;
    return new Date()
  }
  sendRoomMessasge(messageObj) {

    return new Promise(async resolve => {

      let obj = {
        message: messageObj.message,
        roomId: messageObj.roomId,
      }

      let response = await this.network.sendRoomMessasge(obj);
      resolve(response);
      
    })

  }
  sendMessage(string, product_id) {

    return new Promise(async resolve => {

      let obj = {
        message: string,
        product_id: product_id
      }

      console.log(obj);
      let response = await this.network.sendMessage(obj)
      resolve(response);

    })

  }


}
