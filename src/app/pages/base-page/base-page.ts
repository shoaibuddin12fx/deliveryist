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
