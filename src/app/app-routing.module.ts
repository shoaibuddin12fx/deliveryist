import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authguards/auth.guard';
import { ChatPageRoutingModule } from './pages/chat-list/chat-list-routing.module';
import { MarketPlacePageRoutingModule } from './pages/market-place/market-place-routing.module';
import { PagesModule } from './pages/pages.module';
import { SplashScreenPageModule } from './pages/splash-screen/splash-screen.module';
import { SplashScreenPage } from './pages/splash-screen/splash-screen.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import(() => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  // {
  //   path: 'consumer',
  //   loadChildren: () => import(' ./pages/pages.module#PagesModule').then(m => m.),
  //   data: { role: 'Consumer' },
  //   // canActivate: [AuthGuard],
  // },

  // {
  //   path: 'driver',
  //   loadChildren: () => import('./pages/pages.module#PagesModule').then(m => m.),
  //   data: { role: 'Driver' },
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'splash-screen',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'marketplace',
  //   loadChildren: () => import('./pages/market-place/market-place.component.module#MarketPlaceComponentModule').then(m => m.),
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'chat',
  //   loadChildren: () => import('./pages/chat-list/chat-list.component.module#ChatListComponentModule').then(m => m.),
  //   // canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    MarketPlacePageRoutingModule,
    ChatPageRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
