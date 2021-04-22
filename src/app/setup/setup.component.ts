import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.Service';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: 'setup.component.html',
    styleUrls: ['setup.component.css']
})
export class SetupComponent {

    category: string;
    ssid: string;
    bssid: string;
    dIP: string;
    IsLoggedIn: boolean = false;

    constructor(private _router: Router, private _toastController: ToastController,
        private _loading: LoadingService, private alertController: AlertController,
        private _appService: AppService, private _http: HttpClient) {

    }

    ngOnInit() {
        this.ssid = window.localStorage.getItem('dSSID');
        if (this.ssid.includes('d01'))
            this.category = 'cooler';
        else if (this.ssid.includes('d02'))
            this.category = 'fan';
        this.bssid = window.localStorage.getItem('dBSSID');
        this.dIP = window.localStorage.getItem('dIP');
    }

    ionViewWillEnter() {
        this.ssid = window.localStorage.getItem('dSSID');
        this.IsLoggedIn =JSON.parse(window.localStorage.getItem('user')).email!='Guest';
    }

    async presentToast(msg) {
        const toast = await this._toastController.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }

    DirectConnectButtonClicked() {
        this.presentAlertPrompt();
    }

    RouterConnectButtonClicked() {
        this._router.navigate(['networks']);
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Device Name',
            inputs: [
                {
                    name: 'DeviceName',
                    type: 'text',
                    value: this.ssid,
                    placeholder: 'Enter Device Name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {

                    }
                }, {
                    text: 'Connect',
                    handler: (data) => {
                        this._loading.present();
                        var IsOn = false;
                        var rangevalue = 1;
                        var iswateron = false;
                        var isswingon = false;
                        var url = 'http://' + this.dIP + '/GetStatus';
                        this._http.get(url).subscribe((response: any) => {
                            if (response.D0 == "0" || response.D1 == "0" || response.D2 == "0") {
                                IsOn = true;
                                if (response.D0 == "0")
                                    rangevalue = 1;
                                else if (response.D1 == "0")
                                    rangevalue = 2;
                                else if (response.D2 == "0")
                                    rangevalue = 3;

                                if (response.D3 == "0")
                                    iswateron = true;
                                else
                                    iswateron = false;

                                if (response.D4 == "0")
                                    isswingon = true;
                                else
                                    isswingon = false;
                            }
                            else
                                IsOn = false;

                            var dName = this.ssid;
                            if (data.DeviceName != '')
                                dName = data.DeviceName;

                            var result = this._appService.AddDevice(dName, this.bssid, this.category, response.PumpMode, this.dIP, true, rangevalue, iswateron, isswingon, IsOn, this.ssid, response.waterLevel);
                            this.presentToast(result);
                            this._loading.dismiss();
                            this.alertController.dismiss();
                            this._router.navigate(['home']);

                        }, () => {
                            this._loading.dismiss();
                            this.presentToast('Connection failed. Please try after sometime.');
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}