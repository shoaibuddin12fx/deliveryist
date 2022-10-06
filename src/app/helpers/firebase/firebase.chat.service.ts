import { Injectable } from '@angular/core';
//  import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface chatRoom {
  $key?: string;
  initiator_id?: string;
  recipient_id?: string;
}

// import {
//   AngularFireDatabase,
//   AngularFireList,
//   AngularFireObject,
// } from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object

import { map } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/_helpers/network.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseChatService {
  // chatroomCollectionRef: AngularFirestoreCollection<chatRoom>;
  public chatroomCollection: any[];
  // chatroom: AngularFireList<any[]>;
  chatList: any;

  public ARooms;
  public BRooms;

  constructor(
    // private afs: AngularFirestore,
    private network: NetworkService
  ) {
    // this.chatroomCollectionRef = this.afs.collection<chatRoom>('rooms');
  }

  async returnChatRoomFirebase(obj) {
    // if room exist return that room id
    // if room doesn't exist - create room and then return room id

    let list = [];

    this.ARooms = await this.myRooms(obj['initiator_id']);
    this.BRooms = await this.hisRooms(obj['initiator_id']);

    list = this.ARooms.map((item, i) =>
      Object.assign({}, item, this.BRooms[i])
    );

    console.log(list);
    console.log(list);

    return list;
  }

  myRooms(initiator_id) {
    return new Promise((resolve) => {
      // this.afs.collection<chatRoom>('rooms', ref => ref.where('initiator_id', '==', initiator_id)).snapshotChanges()
      //   .pipe(map((mutation: any[]) => mutation.map(p => {
      //     console.log(p);
      //     return { ...p.payload.doc.data(), 'id': [p.payload.doc.id][0] };
      //   })))
      //   .subscribe(v => {
      //     console.log(v);
      //     resolve(v);
      //   });
    });
  }

  hisRooms(initiator_id) {
    return new Promise((resolve) => {
      // this.afs.collection<chatRoom>('rooms', ref => ref.where('recipient_id', '==', initiator_id)).snapshotChanges()
      //   .pipe(map((mutation: any[]) => mutation.map(p => {
      //     console.log(p);
      //     return { ...p.payload.doc.data(), 'id': [p.payload.doc.id][0] };
      //   })))
      //   .subscribe(v => {
      //     console.log(v);
      //     resolve(v);
      //   });
    });
  }

  getAllChats(): Promise<chatRoom[]> {
    return new Promise(async (resolve) => {
      const response = await this.network.postGetChatList();
      console.log(response);
      if (response) {
        const chats = response['chatList'];
        resolve(chats);
      } else {
        resolve([]);
      }
    });
  }
}
