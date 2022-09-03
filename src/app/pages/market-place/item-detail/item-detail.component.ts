import {
  Component,
  OnInit,
  Injector,
  AfterViewInit,
  Input,
} from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product.model';
import { FavoritesService } from '../services/favorites.service';
// import { MapService } from '../services/map.service';
// import M from 'materialize-css/dist/js/materialize.min.js';
import { LiveChatService } from '../../chat-list/services/live-chat.service';
import { ProductmapService } from '../services/productmap.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent
  extends BasePage
  implements OnInit, AfterViewInit
{
  @Input('showBackButton') showBackButton: boolean = false;
  public item: Product;
  public messages: any[] = [];
  input_message: string = '';
  imageObject: Array<object> = [];
  extra_labels: any[];
  location_block: String = '';

  public isFav = false;
  public loading = false;
  constructor(
    injector: Injector,
    public mapService: ProductmapService,
    public productService: ProductService,
    public cartService: CartService,
    public favService: FavoritesService,
    public liveChatService: LiveChatService
  ) {
    super(injector);
    this.initialize();
  }

  async ngOnInit() {
    let coords = await this.mapService.getCoords();
    // let coords = {lng:111.15346, lat: 27.23358}
    console.log(coords);
    let address = await this.mapService.getGeoAddress(coords);
  }

  ngAfterViewInit() {
    var self = this;
    this.initializeSlider();
    setTimeout(async () => {
      self.isFav = await this.isFavourite();
    }, 500);
  }

  async initialize() {
    this.loading = true;
    const itemId = await this.getParams().itemId;
    this.item = await this.productService.loadOne(itemId);
    this.item['qty'] = 1;
    // This Is a Temporary Solution For Getting Product Id
    this.item.id = itemId;
    console.log('This  Is the Item Id', this.item.id);
    this.imageObject = [];
    this.item.photos_urls.forEach((elem) => {
      this.imageObject.push(elem);
    });
    this.extra_labels = JSON.parse(this.item.extra_labels);

    this.loading = false;
  }
  goBack() {
    this.location.back();
  }
  initializeSlider() {
    const options = {
      fullWidth: true,
    };
    var elems = document.querySelectorAll('.slider');
    // var instances = M.Slider.init(elems, options);
    // const instances = M.Carousel.init(this.carousel, options);
    // return instances;
  }

  toggleLike($event) {
    console.log($event);
    this.favService.toggleItemToFavorite(this.item, $event);
  }

  async isFavourite() {
    return false;
    // if (this.item) {
    //   return this.item
    // } else {
    //   return false;
    // }
  }

  async chatWithVendor($event) {
    // open chat room for that person
    // get id of room
    console.log(this.input_message);

    this.messages.push(this.input_message);

    let finiah = await this.liveChatService.sendMessage(
      this.input_message,
      this.item.id
    );
    if (finiah) {
      this.input_message = null;
    }

    // let roomid = await this.productService.getChatRoomOfProduct(this.item);
    // if (roomid) {
    //   this.navigateTo('chat/room/' + roomid);
    // }
  }

  onAddToCart($event) {
    $event.stopPropagation();
    var self = this;
    this.cartService.onAddToCart(this.item).then((itm) => {
      self.item['qty'] = itm.qty;
      console.log(itm);
      this.navigateTo('marketplace/cart');
    });
  }
}
