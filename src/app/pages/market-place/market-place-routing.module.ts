import { MarketPlaceComponent } from './market-place.component';
import { SellComponent } from './sell/sell.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SearchComponent } from './search/search.component';
import { MyItemComponent } from './my-item/my-item.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { PageListComponent } from './page-list/page-list.component';
import { MarketHomeComponent } from './market-home/market-home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from 'src/app/services/authguards/auth.guard';
import { ProductMapPageComponent } from './product-map-page/product-map-page.component';
import { ProductLocationComponent } from './product-location/product-location.component';

const marketroutes: Routes = [
    {
        path: 'marketplace',
        component: MarketPlaceComponent,
        children: [
            {
                path: '',
                redirectTo: 'market-home',
                pathMatch: 'full'
            },
            {
                path: 'market-home',
                component: MarketHomeComponent,
            },
            {
                path: 'products',
                component: ProductsComponent,
            },
            {
                path: 'sell',
                component: SellComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'page-list',
                component: PageListComponent
            },
            {
                path: 'userlocation',
                component: ProductMapPageComponent
            },
            {
                path: 'productlocation',
                component: ProductLocationComponent
            },

            {
                path: 'myitem',
                component: MyItemComponent
            },
        ]
    },
    {
        path: 'myitem',
        component: MyItemComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: 'add_product',
        component: AddEditProductComponent
    },
    {
        path: 'edit_product/:itemId',
        component: AddEditProductComponent
    },
    {
        path: 'product/:itemId',
        component: ItemDetailComponent
    },
    {
        path: 'cart',
        component: CartListComponent
    },



];

@NgModule({
    imports: [RouterModule.forChild(marketroutes)],
    exports: [RouterModule]
})
export class MarketPlacePageRoutingModule { }