import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent extends BasePage implements OnInit {

  loading = false;

  public pageLinks = [
    {
      id: 1,
      label: 'Profile',
      page:  'ProfileComponent',
      route: 'marketplace/profile'
    },
    {
      id: 2,
      label: 'Location',
      page: 'LocationPage',
    },
    {
      id: 3,
      label: 'Orders',
      page: 'OrdersPage',
    },
    {
      id: 4,
      label: 'Payment',
      page: 'PaymentPage',
    },
    {
      id: 5,
      label: 'Addresses',
      page: 'AddressPage',
    },
    {
      id: 6,
      label: 'Favourites',
      page: 'FavoritesComponent',
      route: 'marketplace/favorites'
    },
    {
      id: 6,
      label: 'My Items',
      page: 'MyItemComponent',
      route: 'marketplace/myitem'
    },
    {
      id: 7,
      label: 'Change Password',
      page: 'PasswordPage',
    },
    {
      id: 8,
      label: 'Edit Profile',
      page: 'EditProfilePage',
    },
    {
      id: 9,
      label: 'Settings',
      page: 'SettingsPage',
    },
    {
      id: 10,
      label: 'Logout',
      page: '',
    },
  ]

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  gotoPage(item){

    if(item.id == 10){
      this.authService.logout();
    }else{
      this.navigateTo(item.route)
    }
  }

}
