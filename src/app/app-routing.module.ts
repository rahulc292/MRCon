import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CoolerComponent } from './cooler/cooler.component';
import { SearchComponent } from './search/search.component';
import { SetupComponent } from './setup/setup.component';
import { NetworksComponent } from './networks/networks.component';
import { LoginComponent } from './login/login.component';
import { HomeGuardService,LoginGuardService } from './services/authGuard.service';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate:[HomeGuardService]
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'setup',
    component: SetupComponent,
  },
  {
    path: 'networks',
    component: NetworksComponent,
  },
  {
    path: 'cooler',
    component: CoolerComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[LoginGuardService]
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
