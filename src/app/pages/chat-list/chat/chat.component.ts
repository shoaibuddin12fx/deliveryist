import { Component, OnInit, Injector, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { ChatusersService } from '../services/chatusers.service';
import { LiveChatService } from '../services/live-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends BasePage implements OnInit, AfterViewInit {

  @ViewChild('chatcontainer', {static: true}) chatcontainer: ElementRef;
  roomId = '';
  message = '';
  title = '';
  sending = false;

  constructor(injector: Injector, public chatuser: ChatusersService, public liveChatService: LiveChatService) { 
    super(injector);
    
    this.roomId = this.getParams().roomId;
    this.liveChatService.setRoomId(this.roomId);
    this.liveChatService.initialize();
    this.title = this.getQueryParams().title;
    console.log(this.title);


    
  }

  ngAfterViewInit(): void {

    // call to get all messages
    console.log(this.roomId)
    
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.chatcontainer.nativeElement.scrollTop = this.chatcontainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  handleSubmit($event){
    if($event.keyCode == 13){
      this.sendMessage();
    }
  }

  async sendMessage(){

    if(this.message){
      console.log(this.message);

    
      let obj = {
        message: this.message,
        roomId: this.roomId
      }
    
      this.sending = true;
      let finiah = await this.liveChatService.sendRoomMessasge(obj);

      if(finiah){
        this.sending = false;
        console.log(finiah);
        this.liveChatService.chatMessageCollection.push(finiah['chat']);
        this.message = null;
        this.scrollToBottom();
      }

    }
  
  }

  

}
