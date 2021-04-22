import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { ToastController, AlertController } from '@ionic/angular';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { LoadingService } from '../services/loading.Service';
import { HttpClient } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire';

@Component({
    templateUrl: 'networks.component.html',
    styleUrls: ['networks.component.css']
})
export class NetworksComponent {

    Networklist: any = [];
    dIP: string;
    category: string;
    ssid: string;
    bssid: string;
    uid: string;

    constructor(private _router: Router, private _appService: AppService,
        private _toastController: ToastController, private _wifiWizard2: WifiWizard2,
        private alertController: AlertController, private _loading: LoadingService,
        private _activedRoute: ActivatedRoute, private _http: HttpClient, private firebase: FirebaseApp) {

    }

    ngOnInit() {
        this.ScanClicked();
        this.ssid = window.localStorage.getItem('dSSID');
        this.bssid = window.localStorage.getItem('dBSSID');
        this.uid = JSON.parse(window.localStorage.getItem('user')).uid;
        if (this.ssid.includes('d01'))
            this.category = 'cooler';
        else if (this.ssid.includes('d02'))
            this.category = 'fan';
        this.dIP = window.localStorage.getItem('dIP');
    }

    ScanClicked() {
        var obj = this;
        obj.Networklist = [];
        this._wifiWizard2.scan().then(function (res) {
            var nlist = res.filter(d => !d.SSID.includes('MRCon'));
            nlist.forEach(element => {
                obj.Networklist.push({ 'SSID': element.SSID, 'BSSID': element.BSSID, 'icon': 'wifi.png', 'Name': element.SSID });
            });

            if (obj.Networklist.length <= 0) {
                obj.presentToast('No Device found. Please try again.');
            }
        }, function () {

        });
    }

    SSIDClicked(item) {
        this.presentAlertPrompt(item);
    }

    async presentToast(msg) {
        const toast = await this._toastController.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }

    async presentAlertPrompt(item) {
        var CurObj = this;
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Wifi Password',
            inputs: [
                {
                    name: 'Password',
                    type: 'password',
                    placeholder: 'Enter Password'
                },
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
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Connect',
                    handler: (data) => {
                        CurObj._loading.present();
                        var url = 'http://' + this.dIP + '/setting?ssid=' + item.SSID + '&pass=' + data.Password + '&uid=' + CurObj.uid;
                        this._http.get(url).subscribe(() => {
                            this._wifiWizard2.connect(item.SSID, true, data.Password, "WPA").then(function (res) {
                                CurObj.firebase.database().ref(CurObj.uid + "/" + CurObj.bssid).update({ 'Name': data.DeviceName, 'Category': CurObj.category }).then(() => {
                                    CurObj.firebase.database().ref("Presence/" + CurObj.uid + "/" + CurObj.bssid).update({ 'Reset': 0 }).then(() => {
                                        CurObj._appService.AddDevice(data.DeviceName, CurObj.bssid, CurObj.category, 'Manual', CurObj.dIP, false, 1, false, false, true, CurObj.ssid, 'NA');
                                        CurObj._loading.dismiss();
                                        CurObj.presentToast('Success');
                                        CurObj._router.navigate(['home']);
                                        return true;
                                    }, function () {
                                        CurObj._loading.dismiss();
                                        CurObj.presentToast('Something went wrong. Please try again.');
                                        CurObj._router.navigate(['home']);
                                        return true;
                                    });
                                }, function () {
                                    CurObj._loading.dismiss();
                                    CurObj.presentToast('Something went wrong. Please try again.');
                                    CurObj._router.navigate(['home']);
                                    return true;
                                });
                            }, function (err) {
                                CurObj._loading.dismiss();
                                CurObj.presentToast('Something went wrong. Please try again.');
                                CurObj._router.navigate(['home']);
                                return true;
                            });
                        }, () => {
                            this._loading.dismiss();
                            this.presentToast('Connection error.');
                            CurObj._router.navigate(['home']);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}