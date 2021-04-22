import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;
  private loaders = new Array<HTMLIonLoadingElement>();
  loader: any;

  constructor(public loadingController: LoadingController) {

  }

  async present() {
    this.dismiss();
    this.loader = this.loadingController.create({
      backdropDismiss: true
    });
    this.loader.then(p => {
      p.present();
    })
  }

  async dismiss() {
    if (this.loader) {
      this.loader.then(p => {
        p.dismiss();
      });
    }
  }
}