import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent extends BasePage implements OnInit {

  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit() {
  }

}
