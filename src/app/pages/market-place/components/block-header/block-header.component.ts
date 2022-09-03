import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { Router } from '@angular/router';
import { PreferenceService } from '../../services/preference.service';
import { Location } from '@angular/common';
// import M from "materialize-css/dist/js/materialize.min.js";

@Component({
  selector: 'app-block-header',
  templateUrl: './block-header.component.html',
  styleUrls: ['./block-header.component.scss']
})
export class BlockHeaderComponent implements OnInit {


  @Input('title') title = '';
  @Input('showBackButton') showBackButton: boolean = false;
  @Input('showLocation') showLocation: boolean = false;
  @Input('showSearch') showSearch: boolean = false;
  @Input('showCart') showCart: boolean = false;
  @Input('showProfile') showProfile: boolean = false;
  @Input('showLike') showLike: boolean = false;
  @Input('isLike') isLike: boolean = false;
  @Output('toggleLike') toggleLike: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('backPress') backPress: EventEmitter<boolean> = new EventEmitter<boolean>();

  elem;
  elemInstance;

  constructor(public authService: AuthService,
              public router: Router,
              public location: Location,
              public pref: PreferenceService
  ) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elem = document.querySelectorAll(".sidenav");
  }

  setToggleLike(){
    this.isLike = !this.isLike;
    this.toggleLike.emit(this.isLike);
  }

  openSidenav() {
    // this.elemInstance = M.Sidenav.init(this.elem, {
    //   edge: "left",
    //   inDuration: 250
    // });
  }

  closeSidenav() {
    // let navInstance = M.Sidenav.getInstance(this.elem);
    this.elemInstance.close();
  }

  dologout() {

    this.authService.logout();
    this.router.navigate(['/']);
    this.closeSidenav();
  }

  routeTo(link) {
    this.router.navigate([link]);
    this.closeSidenav();
  }

  goBack() {
    this.backPress.emit();
    this.location.back()
  }

  gotoCart(){
    this.router.navigate(['marketplace/cart']);
  }

  gotoSearch(){
    // this.router.navigate(['marketplace/cart']);
  }

}
