import { ChatusersService } from './../services/chatusers.service';
import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { FirebaseChatService } from 'src/app/helpers/firebase/firebase.chat.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BasePage implements OnInit {

  users: any[] = [];
  chats: any[] = [];
  constructor(
    injector:Injector,
    public chatuserService: ChatusersService,
    public utility: UtilityService,
    public fbChat:FirebaseChatService
    ) { 
    super(injector);
    this.initialize();

  }


  ngOnInit() {
    this.fbChat.getAllChats().then(res => {
      console.log(res);
      this.chats = res;
    });
  }

  async initialize(){
    // this.chats = await this.chatuserService.load();
    // console.log(this.chats);
    // let uid = await this.utility.returnCurrentUserUid();
    // console.log(uid);
    // let obj = {
    //   initiator_id: uid
    // }
    // this.fbChat.returnChatRoomFirebase(obj);

    // this.fbChat.returnChatRoomFirebase(obj).then(chats => {
    //   this.chats = chats;
    //   console.log('From Chat List Component', this.chats);
    // }).catch(error =>{
    //   console.log(error);
    // });
  }
}
