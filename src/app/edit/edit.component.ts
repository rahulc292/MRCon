import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FirebaseApp } from '@angular/fire';
import { LoadingService } from '../services/loading.Service';
import { ToastController, Platform, AnimationController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'edit.component.html',
    styleUrls: ['edit.component.css']
})
export class EditComponent {

    UserEmail: string;
    DeviceName: string;
    Device: any = {};
    usr: any;
    IsMobileOnline: boolean = false;


    constructor(private _appService: AppService, private firebase: FirebaseApp,
        private _loading: LoadingService, private _toastController: ToastController,
        private alertController: AlertController, private _router: Router) {

    }

    ngOnInit() {

        this.firebase.database().ref('.info/connected').on('value', resp => {
            this.IsMobileOnline = resp.val();
        });

        var DId = window.localStorage.getItem('DId');
        this.usr = JSON.parse(window.localStorage.getItem('user'));
        this.Device = this._appService.GetDeviceDetails(DId);
        if (this.Device) {
            this.DeviceName = this.Device.Name;
            this.UserEmail = this.usr.email;
        }

    }

    async presentToast(msg) {
        const toast = await this._toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    UpdateButtonClicked() {
        if (this.Device.IsDirectConnected) {
            this.Device.Name = this.DeviceName;
            this._appService.UpdateDeviceDetails(this.Device);
        }
        else {
            this._loading.present();
            this.firebase.database().ref(this.usr.uid + "/" + this.Device.Mac).update({ 'Name': this.DeviceName }).then(() => {
                this.Device.Name = this.DeviceName;
                this._appService.UpdateDeviceDetails(this.Device);
                this._loading.dismiss();
                this.presentToast('Success.');
            }, () => {
                this._loading.dismiss();
                this.presentToast('Connection error.');
            });
        }
    }

    DeleteButtonClicked() {
        this.presentAlertConfirm(this.Device);
    }

    async presentAlertConfirm(d) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Are you sure to delete?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        if (d.IsDirectConnected) {
                            this._appService.DeleteDevice(d);
                            this.presentToast('Device Deleted');
                            this._router.navigate(['home']);
                        }
                        else {
                            if (this.IsMobileOnline) {
                                this._loading.present();
                                this.firebase.database().ref("Presence/" + this.usr.uid + "/" + d.Mac).update({ 'Reset': 1 }).then(() => {
                                    this.firebase.database().ref(this.usr.uid + "/" + d.Mac).remove().then(() => {
                                        this._appService.DeleteDevice(d);
                                        this.presentToast('Device Deleted');
                                        this._loading.dismiss();
                                        this._router.navigate(['home']);
                                    }, () => {
                                        this._loading.dismiss();
                                        this.presentToast('Connection error.');
                                    });
                                }, () => {
                                    this._loading.dismiss();
                                    this.presentToast('Connection error.');
                                });
                            }
                            else {
                                this.presentToast('Please connect mobile to working internet connection.');
                            }
                        }
                    }
                }
            ]
        });

        await alert.present();
    }
}