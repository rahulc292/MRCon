import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.Service';
import { ToastController, Platform, AnimationController } from '@ionic/angular';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';

@Component({
    templateUrl: 'cooler.component.html',
    styleUrls: ['cooler.component.css']
})
export class CoolerComponent {
    switch2: boolean = false;
    switch1: boolean = true;
    Device: any = {};
    HostUrl: string;
    BSSID: string;
    IsDirectConnected: boolean;
    WaterLevel: string;
    usr;
    OldWaterLevel: number;
    OldOnlineOfflineStatus: boolean = true;
    OldOnOffStatus: boolean = true;

    @ViewChild('tk') tk: ElementRef;
    @ViewChild('text') text: ElementRef;
    @ViewChild('lq') lq: ElementRef;
    @ViewChild('ring') ring: ElementRef;

    constructor(private _appService: AppService, private _http: HttpClient, private _loading: LoadingService,
        private _toastController: ToastController, private _wifiWizard2: WifiWizard2,
        private _router: Router, public platform: Platform, private animationCtrl: AnimationController,
        private firebase: FirebaseApp, private zone: NgZone) {
    }

    ngDoCheck() {
        this.InitilizeWaterLevel();
        this.CheckOnlineOffilineStatus();
        this.CheckOnOffStatus();
    }

    CheckOnlineOffilineStatus() {
        var onlineofflineStatus = this.Device.IsOnline;
        if (onlineofflineStatus != this.OldOnlineOfflineStatus) {
            this.OldOnlineOfflineStatus = onlineofflineStatus;
            if (!this.OldOnlineOfflineStatus)
                this._router.navigate(['home']);
        }
    }

    CheckOnOffStatus() {
        var onOffStatus = this.Device.IsOn;
        if (onOffStatus != this.OldOnOffStatus) {
            this.OldOnOffStatus = onOffStatus;
            if (!this.OldOnOffStatus)
                this._router.navigate(['home']);
        }
    }

    ngOnInit() {
        var CurObj = this;
        this.usr = JSON.parse(window.localStorage.getItem('user'));
        var DId = window.localStorage.getItem('DId');
        this.Device = this._appService.GetDeviceDetails(DId);
        if (this.Device) {
            this.HostUrl = this.Device.IP;
            this.BSSID = this.Device.Mac;
            this.IsDirectConnected = this.Device.IsDirectConnected;
            this.WaterLevel = this.Device.WaterLevel;
        }

        document.addEventListener("online", function () {
            CurObj.ionViewWillEnter();
        }, false);

        document.addEventListener("offline", function () {
            CurObj._router.navigate(['home']);
        }, false);
    }

    InitilizeWaterLevel() {
        var amount = parseInt(this.Device.WaterLevel);
        if (amount != this.OldWaterLevel) {
            this.OldWaterLevel = amount;
            setTimeout(() => {
                if (amount >= 0) {
                    var quantity = amount;
                    if (amount == 50)
                        amount = amount + 20;
                    this.animationCtrl.create()
                        .addElement(this.lq.nativeElement)
                        .duration(1000)
                        .fromTo('height', '0%', String(amount) + '%').play();
                    this.ring.nativeElement.style.height = (100 - amount + 10) + '%';
                    this.text.nativeElement.innerText = String(quantity) + '%';
                    if (amount == 100) {
                        this.ring.nativeElement.style.height = "32%";
                        this.ring.nativeElement.style.top = "2px";
                        this.text.nativeElement.style.left = "38%";
                        this.tk.nativeElement.style.border = "none";
                        this.text.nativeElement.style.color = "black";
                        this.lq.nativeElement.style.borderBottom = "3px solid black";
                    }
                    else if (amount == 70) {
                        this.ring.nativeElement.style.height = "58%";
                        this.tk.nativeElement.style.border = "none";
                        this.text.nativeElement.style.color = "black";
                        this.lq.nativeElement.style.borderBottom = "3px solid black";
                        this.ring.nativeElement.style.top = "0px";
                        this.text.nativeElement.style.left = "42%";
                    }
                    else if (amount == 0) {
                        this.lq.nativeElement.style.borderBottom = "3px solid red";
                        this.tk.nativeElement.style.border = "1px solid red";
                        this.text.nativeElement.style.color = "red";
                        this.text.nativeElement.style.left = "44%";
                        this.ring.nativeElement.style.top = "0px";
                    }
                }
            }, 0);
        }
    }

    SpeedChanged() {
        this._loading.present();
        if (this.Device.rangevalue == 1) {
            this.switch2 = false;
            this.switch1 = true;
        }
        else if (this.Device.rangevalue == 2) {
            this.switch2 = true;
            this.switch1 = false;
        }
        else {
            this.switch1 = false;
            this.switch2 = false;
        }

        if (this.IsDirectConnected) {
            var url = 'http://' + this.HostUrl + '/D0?val=' + this.Device.rangevalue;
            this._http.get(url).subscribe(() => {
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this._loading.dismiss();
                this.presentToast('Connection error.');
            });
        }
        else {
            this.firebase.database().ref(this.usr.uid + "/" + this.Device.Mac).update({ 'Speed': this.Device.rangevalue }).then(() => {
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this._loading.dismiss();
                this.presentToast('Connection error.');
            });
        }
    }

    WaterPumpClicked() {
        this._loading.present();
        this.Device.iswateron = !this.Device.iswateron;
        if (this.IsDirectConnected) {
            var url = 'http://' + this.HostUrl + '/D3?val=' + (this.Device.iswateron ? "1" : "0");
            this._http.get(url).subscribe(() => {
                if (!this.Device.iswateron)
                    this.Device.WaterPumpMode = 'Manual';
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this.Device.iswateron = !this.Device.iswateron;
                this._loading.dismiss();
            });
        }
        else {
            this.firebase.database().ref(this.usr.uid + "/" + this.Device.Mac).update({ 'Water': this.Device.iswateron }).then(() => {
                if (!this.Device.iswateron)
                    this.Device.WaterPumpMode = 'Manual';
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this._loading.dismiss();
                this.presentToast('Connection error.');
            });
        }
    }

    SwingClicked() {
        this._loading.present();
        this.Device.isswingon = !this.Device.isswingon;
        if (this.IsDirectConnected) {
            var url = 'http://' + this.HostUrl + '/D4?val=' + (this.Device.isswingon ? "1" : "0");
            this._http.get(url).subscribe(() => {
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this.Device.isswingon = !this.Device.isswingon;
                this._loading.dismiss();
            });
        }
        else {
            this.firebase.database().ref(this.usr.uid + "/" + this.Device.Mac).update({ 'Swing': this.Device.isswingon }).then(() => {
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this._loading.dismiss();
                this.presentToast('Connection error.');
            });
        }
    }

    WaterPumpModeChanged() {
        this._loading.present();
        if (this.Device.IsDirectConnected) {
            var url = 'http://' + this.HostUrl + '/SetPumpMode?val=' + this.Device.WaterPumpMode;
            this._http.get(url).subscribe(() => {
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {

                this._loading.dismiss();
            });
        }
        else {
            this.firebase.database().ref(this.usr.uid + "/" + this.Device.Mac).update({ 'PumpMode': this.Device.WaterPumpMode }).then(() => {
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
            }, () => {
                this._loading.dismiss();
                this.presentToast('Connection error.');
            });
        }
    }

    async presentToast(msg) {
        const toast = await this._toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    ionViewWillEnter() {
        var CurObj = this;
        if (this.IsDirectConnected) {
            this._wifiWizard2.getConnectedBSSID().then(function (BSSID) {
                if (BSSID.substring(3) != CurObj.BSSID)
                    CurObj._router.navigate(['home']);
            }, function () {
                CurObj._router.navigate(['home']);
            });

            this.SyncDevices();
        }
    }

    SyncDevices() {
        if (this.Device) {
            this._loading.present();
            var url = 'http://' + this.Device.IP + '/GetStatus';
            this._http.get(url).subscribe((response: any) => {
                if (response.D0 == "1" || response.D1 == "1" || response.D2 == "1") {
                    this.Device.IsOn = true;
                    if (response.D0 == "1")
                        this.Device.rangevalue = 1;
                    else if (response.D1 == "1")
                        this.Device.rangevalue = 2;
                    else if (response.D2 == "1")
                        this.Device.rangevalue = 3;

                    if (response.D3 == "1")
                        this.Device.iswateron = true;
                    else {
                        if (response.PumpMode == 'Manual')
                            this.Device.iswateron = false;
                        else
                            this.Device.iswateron = true;
                    }

                    if (response.D4 == "1")
                        this.Device.isswingon = true;
                    else
                        this.Device.isswingon = false;

                    this.Device.WaterPumpMode = response.PumpMode;
                    this.Device.WaterLevel = response.waterLevel;
                }
                else
                    this.Device.IsOn = false;

                this._appService.UpdateDeviceDetails(this.Device);
                this.Device = this._appService.GetDeviceDetails(this.Device.Mac);
                //this.InitilizeWaterLevel();
                this._loading.dismiss();

            }, () => {
                this.Device = this._appService.GetDeviceDetails(this.Device.Mac);
                //this.InitilizeWaterLevel();
                this._loading.dismiss();
            });
        }
    }

    doRefresh(event) {

        var url = 'http://' + this.Device.IP + '/GetStatus';
        this._http.get(url).subscribe((response: any) => {
            if (response.D0 == "1" || response.D1 == "1" || response.D2 == "1") {
                this.Device.IsOn = true;
                if (response.D0 == "1")
                    this.Device.rangevalue = 1;
                else if (response.D1 == "1")
                    this.Device.rangevalue = 2;
                else if (response.D2 == "1")
                    this.Device.rangevalue = 3;

                if (response.D3 == "1")
                    this.Device.iswateron = true;
                else {
                    if (response.PumpMode == 'Manual')
                        this.Device.iswateron = false;
                    else
                        this.Device.iswateron = true;
                }

                if (response.D4 == "1")
                    this.Device.isswingon = true;
                else
                    this.Device.isswingon = false;

                this.Device.WaterPumpMode = response.PumpMode;
                this.Device.WaterLevel = response.waterLevel;
            }
            else
                this.Device.IsOn = false;

            this._appService.UpdateDeviceDetails(this.Device);
            this.Device = this._appService.GetDeviceDetails(this.Device.Mac);
            //this.InitilizeWaterLevel();
            event.target.complete();

        }, () => {
            this.Device = this._appService.GetDeviceDetails(this.Device.Mac);
            //this.InitilizeWaterLevel();
            event.target.complete();
        });
    }

    EditButtonClicked(){
        this._router.navigate(['edit']);
    }
}