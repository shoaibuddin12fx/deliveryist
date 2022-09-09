import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilityService } from 'src/app/services/_helpers/utility.service';

declare var google;

@Component({
  selector: 'app-track-map',
  templateUrl: './track-map.component.html',
  styleUrls: ['./track-map.component.scss'],
})
export class TrackMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;

  constructor(public platform: Platform, public utility: UtilityService) {
    this.initialize();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  async initialize() {
    await this.platform.ready();
    this.initializeMapBeforeSetCoordinates();
  }

  initializeMapBeforeSetCoordinates() {
    return new Promise(async (resolve) => {
      const res = (await this.utility.getCurrentLocationCoordinates()) as any;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: res.coords,
      });
      resolve(true);
    });
  }
}
