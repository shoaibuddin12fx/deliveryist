import { MarketPlaceComponent } from './market-place.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MaterializeModule } from 'angular2-materialize';
import { CategoriesComponent } from './categories/categories.component';
import { SearchComponent } from './search/search.component';
import { MyItemComponent } from './my-item/my-item.component';
import { MarketPlacePageRoutingModule } from './market-place-routing.module';
import { SellComponentModule } from './sell/sell.component.module';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { PageListComponent } from './page-list/page-list.component';
import { MarketHomeComponent } from './market-home/market-home.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { IconBoxComponent } from './components/icon-box/icon-box.component';
// import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import { CartHeaderComponent } from './components/cart-header/cart-header.component';
import { QtyCounterComponentsModule } from './components/qty-counter/qty-counter.component.module';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { LocationComponent } from './location/location.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/app/services/_helpers/interceptor.service';
import { CartListComponent } from './cart-list/cart-list.component';
// import { AngularFileUploaderModule } from 'angular-file-uploader';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { NgImageSliderModule } from 'ng-image-slider';
import { ProductMapPageComponent } from './product-map-page/product-map-page.component';
import { BlockHeaderComponent } from './components/block-header/block-header.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductLocationComponent } from './product-location/product-location.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CategoryBoxComponent } from './components/category-box/category-box.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ProductsComponent } from './products/products.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
// import { TagInputModule } from 'ngx-chips';
import { IonicModule } from '@ionic/angular';
@NgModule({
  entryComponents: [
    AddEditProductComponent,
    // ProductDetailComponent
  ],
  declarations: [
    MarketPlaceComponent,
    AddEditProductComponent,
    PageListComponent,
    MarketHomeComponent,
    SearchComponent,
    MyItemComponent,
    ProductItemComponent,
    IconBoxComponent,
    CategoriesComponent,
    CartHeaderComponent,
    ItemDetailComponent,
    CartListComponent,
    LocationComponent,
    FavoritesComponent,
    ProductMapPageComponent,
    BlockHeaderComponent,
    ProductLocationComponent,
    CategoryBoxComponent,
    OrderStatusComponent,
    ProductsComponent,
    FilterPipe,
    ProductSliderComponent,
  ],
  exports: [MarketPlaceComponent],
  imports: [
    CommonModule,
    MarketPlacePageRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
    // MaterializeModule,
    SellComponentModule,
    IonicModule,
    // NgxPubSubModule,
    QtyCounterComponentsModule,
    // AngularFileUploaderModule,
    // NgImageSliderModule,
    // InfiniteScrollModule,
    NgxSpinnerModule,
    // TagInputModule,
  ],
  providers: [NgxImageCompressService],
})
export class MarketPlaceComponentModule {}
