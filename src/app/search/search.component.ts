import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { ToastController, AlertController } from '@ionic/angular';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { LoadingService } from '../services/loading.Service';

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent {

    Networklist: any = [];

    constructor(private _router: Router, private _appService: AppService,
        private _toastController: ToastController, private _wifiWizard2: WifiWizard2,
        private alertController: AlertController, private _loading: LoadingService,
        private _activedRoute: ActivatedRoute) {

    }

    ngOnInit() {

        this.ScanClicked();
    }

    ScanClicked() {
        var obj = this;
        obj.Networklist = [];
        this._wifiWizard2.scan().then(function (res) {
            var nlist = res.filter(d => d.SSID.includes('MRCon'));
            nlist.forEach(element => {
                if (element.SSID.includes('d01'))
                    obj.Networklist.push({ 'SSID': element.SSID, 'BSSID': element.BSSID.substring(3), 'icon': 'cooler.png', 'Name': element.SSID + ' - cooler' });
                else if (element.SSID.includes('d02'))
                    obj.Networklist.push({ 'SSID': element.SSID, 'BSSID': element.BSSID.substring(3), 'icon': 'fan.png', 'Name': element.SSID + ' - fan' });
            });

            if (obj.Networklist.length <= 0) {
                obj.presentToast('No Device found. Please try again.');
                obj._router.navigate(['home']);
            }
        }, function () {

        });
    }

    SSIDClicked(item) {
        var CurObj = this;
        var devices = this._appService.GetDevices().filter(d => d.Mac == item.BSSID);
        if (devices.length > 0) {
            this.presentToast("Device already exists.");
            this._router.navigate(['home']);
        }
        else {
            CurObj._loading.present();
            this._wifiWizard2.getConnectedBSSID().then(function (BSSID) {
                if (BSSID.substring(3) != item.BSSID) {
                    CurObj._wifiWizard2.connect(item.SSID, true).then(function () {
                        CurObj._wifiWizard2.getWifiRouterIP().then(function (IP) {
                            window.localStorage.setItem('dSSID', item.SSID);
                            window.localStorage.setItem('dBSSID', item.BSSID);
                            window.localStorage.setItem('dIP', IP);
                            CurObj._loading.dismiss();
                            CurObj._router.navigate(['setup']);
                            
                        }, function () {
                            CurObj._loading.dismiss();
                        });
                    }, function () {
                        CurObj.presentToast('Unable to connect. Please try again.');
                        CurObj._loading.dismiss();
                    });
                }
                else {
                    CurObj._wifiWizard2.getWifiRouterIP().then(function (IP) {
                        window.localStorage.setItem('dSSID', item.SSID);
                        window.localStorage.setItem('dBSSID', item.BSSID);
                        window.localStorage.setItem('dIP', IP);
                        CurObj._loading.dismiss();
                        CurObj._router.navigate(['setup']);
                    }, function () {
                        CurObj._loading.dismiss();
                    });
                }
            }, function () {
                CurObj._wifiWizard2.connect(item.SSID, true).then(function () {
                    CurObj._wifiWizard2.getWifiRouterIP().then(function (IP) {
                        window.localStorage.setItem('dSSID', item.SSID);
                        window.localStorage.setItem('dBSSID', item.BSSID);
                        window.localStorage.setItem('dIP', IP);
                        CurObj._loading.dismiss();
                        CurObj._router.navigate(['setup']);

                    }, function () {
                        CurObj._loading.dismiss();
                    });
                }, function () {
                    CurObj.presentToast('Unable to connect. Please try again.');
                    CurObj._loading.dismiss();
                });
            });
        }

    }

    async presentToast(msg) {
        const toast = await this._toastController.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }
}