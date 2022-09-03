import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { UtilityService } from 'src/app/services/_helpers/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ChatusersService {

  public userlist: any[] = [];

  private sampleData = [
    { 
      id: 1,
      name: "Peter Parker",
      description: "Famous for the role Spiderman",
      image: 'assets/images/electronics.jpg',
      $key: "hgiudgdhafkdjlaghuwane4urnhe",
    },
    { 
      id: 2,
      name: "Jimmy Olson",
      description: "Superman Buddy, Remember !",
      image: 'assets/images/electronics.jpg',
      $key: "hgiudgdhafkdjlaghuwanrturnhe",
    },
    { 
      id: 3,
      name: "Aqua Man",
      description: "He is huge",
      image: 'assets/images/electronics.jpg',
      $key: "hgiudYHtrHDGdjlaghuwanrturnhe",
    },
    { 
      id: 4,
      name: "Wayne",
      description: "As Thomas Wayne Industries",
      image: 'assets/images/electronics.jpg',
      $key: "hgiudYHtrHDGdjlHKgriugwanrturnhe",
    },
  ];
  
  constructor(public network: NetworkService, public utility: UtilityService) { 
    this.userlist = this.sampleData;
  }

  public load(): Promise<any[]> {
    return new Promise( resolve => {
      resolve(this.userlist);
    })
  }

  getRoomMessages(roomId){
    return new Promise( resolve => {
      let data = {room_id: roomId}
      this.network.postGetRoomMessages(data).then( v => {
        console.log(v);

        
        if(v){
          resolve(v['messages'])
        }else{
          resolve([]);
        }
        
      })
    })
  }

  // get the room for a persoon to chat with another person 

  returnHisIdMyId(productId){
    // 

  }
  
  async getChatRoom(params){
    let myId = await this.utility.returnCurrentUserUid();
    let hisId = params['recipient_id'];
    let obj = {
      initiator_id: myId,
      recipient_id: hisId
    }
    // this.fbChat.returnChatRoomFirebase(obj)

  }

}
