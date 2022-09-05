import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/_helpers/modal.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Output('date') date: EventEmitter<any> = new EventEmitter<any>();
  dateTime = null; // constant value

  constructor(public modals: ModalService) {}

  ngOnInit() {}

  sendToParent($event) {
    let v = $event.target.value;

    this.modals.dismiss({ key: v });
  }
}
