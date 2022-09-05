import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/providers/modal-controller';

@Component({
  selector: 'app-driver-instructions',
  templateUrl: './driver-instructions.component.html',
  styleUrls: ['./driver-instructions.component.scss'],
})
export class DriverInstructionsComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss()
  }

  saveInstructions(){
   this.dismissModal()
  }

}
