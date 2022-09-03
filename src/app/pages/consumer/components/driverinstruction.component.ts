import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-driverinstruction',
  templateUrl: './driverinstruction.component.html',
  styleUrls: ['./driverinstruction.component.scss'],
})
export class DriverinstructionComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss()
  }

  saveInstructions(){
   this.dismissModal()
  }
  

}
