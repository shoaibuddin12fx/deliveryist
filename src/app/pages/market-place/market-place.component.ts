import { ProfileService } from './services/profile.service';
import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { FavoritesService } from './services/favorites.service';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent extends BasePage implements OnInit {

  private cartCount;
  
  constructor(injector: Injector,
    public profileService: ProfileService,
    public favService: FavoritesService,
    public mapService: MapService
  ) { 
    super(injector);
    // this.initializeApp();
  }

  ngOnInit() {
    
  }

  // async initializeApp() {
    
  //   this.mapService.initialize();
    
  //   let profile = await this.profileService.getUserProfile();
  //   console.log(profile);

    
  // }



}
