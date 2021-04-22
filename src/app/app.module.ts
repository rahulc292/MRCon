import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { CoolerComponent } from './cooler/cooler.component';
import { SetupComponent } from './setup/setup.component';
import { NetworksComponent } from './networks/networks.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule } from '@angular/forms';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, SearchComponent, CoolerComponent, SetupComponent,NetworksComponent,
    LoginComponent,EditComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    FormsModule, HttpClientModule,AngularFireModule.initializeApp(environment.firebase),AngularFireAuthModule,
    AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, WifiWizard2],
  bootstrap: [AppComponent],
})
export class AppModule { }
