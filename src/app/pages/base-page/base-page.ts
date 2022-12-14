import { AuthService } from 'src/app/services/authguards/auth.service';
import { Injector, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { Location } from '@angular/common';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { StorageService } from 'src/app/services/_helpers/storage.service';
import { EventsService } from 'src/app/services/_helpers/events.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { ModalService } from 'src/app/services/_helpers/modal.service';
import { DataService } from 'src/app/services/data.service';
import { AlertsService } from 'src/app/services/_helpers/alerts.service';
import { GeolocationsService } from 'src/app/services/_helpers/geolocation.service';
import { NavService } from 'src/app/services/nav.service';

export abstract class BasePage {
  public activatedRoute: ActivatedRoute;
  public router: Router;
  public network: NetworkService;
  public utility: UtilityService;
  public location: Location;
  public events: EventsService;
  public authService: AuthService;
  public storage: StorageService;
  public zone: NgZone;
  public modals: ModalService;
  public data: DataService;
  public alert: AlertsService;
  public geoLocation: GeolocationsService;
  public nav: NavService;

  public commonService: CommonServicesService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.network = injector.get(NetworkService);
    this.utility = injector.get(UtilityService);
    this.location = injector.get(Location);
    this.events = injector.get(EventsService);
    this.zone = injector.get(NgZone);
    this.authService = injector.get(AuthService);
    this.storage = injector.get(StorageService);
    this.commonService = injector.get(CommonServicesService);
    this.modals = injector.get(ModalService);
    this.data = injector.get(DataService);
    this.alert = injector.get(AlertsService);
    this.geoLocation = injector.get(GeolocationsService);
    this.nav = injector.get(NavService);
  }

  navigateTo(link, data?: NavigationExtras) {
    console.log(link);
    this.router.navigate([link], data);
  }

  navigateToChild(link, data?: NavigationExtras) {
    data.relativeTo = this.activatedRoute;
    this.router.navigate([link], data);
  }

  getParams() {
    return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }
}
