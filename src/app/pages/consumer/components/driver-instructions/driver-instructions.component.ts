import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController } from '@ionic/angular/providers/modal-controller';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { ModalService } from 'src/app/services/_helpers/modal.service';

@Component({
  selector: 'app-driver-instructions',
  templateUrl: './driver-instructions.component.html',
  styleUrls: ['./driver-instructions.component.scss'],
})
export class DriverInstructionsComponent extends BasePage implements OnInit {
  postJobForm: any;

  constructor(injector: Injector, public modals: ModalService) {
    super(injector);
  }

  ngOnInit() {}

  instructions = '';

  saveInstruction() {
    const v = this.instructions;
    this.modals.dismiss({ data: v });
  }
}
