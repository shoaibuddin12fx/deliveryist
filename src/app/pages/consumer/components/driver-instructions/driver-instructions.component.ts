import { Component, Injector, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/providers/modal-controller';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-driver-instructions',
  templateUrl: './driver-instructions.component.html',
  styleUrls: ['./driver-instructions.component.scss'],
})
export class DriverInstructionsComponent extends BasePage implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  // dismissModal() {
  //   this.modalController.dismiss();
  // }

  // saveInstructions() {
  //   this.dismissModal();
  // }
}
