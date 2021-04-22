import { NgZone, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AlertController, ToastController, Platform, MenuController } from '@ionic/angular';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.Service';
import { interval } from 'rxjs';

import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Devices: any = [];
  subscription;
  IsMobileOnline: boolean = false;
  IsLoggedIn: boolean = false;
  UserEmail: string;
  usr;

  constructor(private _router: Router, private _appService: AppService,
    private _toastController: ToastController, private _wifiWizard2: WifiWizard2,
    private alertController: AlertController, private _http: HttpClient,
    private _loading: LoadingService, private platform: Platform, private firebase: FirebaseApp,
    private ngFireAuth: AngularFireAuth, private menu: MenuController, private zone: NgZone) {

  }

  ngOnInit() {

    this.usr = JSON.parse(window.localStorage.getItem('user'));

    this.Devices = this._appService.GetDevices();

    var CurObj = this;

    document.addEventListener("online", function () {
      CurObj.ionViewWillEnter();
    }, false);

    document.addEventListener("offline", function () {
      CurObj.Devices = CurObj.Devices.map(function (a) {
        a.IsOnline = false;
        CurObj._appService.UpdateDeviceDetails(a);
        return a;
      });
    }, false);

  }

  ionViewWillEnter() {

    this.usr = JSON.parse(window.localStorage.getItem('user'));
    this.IsLoggedIn = this.usr.email != 'Guest';
    this.UserEmail = this.usr.email;

    this.Devices = this._appService.GetDevices();
    var dbd = this.Devices.filter(d => d.IsDirectConnected == true);
    if (dbd.length > 0) {
      var CurObj = this;
      CurObj._wifiWizard2.getConnectedBSSID().then(function (BSSID) {
        var filteredSSid = CurObj.Devices.filter(d => d.Mac == BSSID.substring(3) && d.IsDirectConnected)[0];
        CurObj.Devices = CurObj.Devices.map(function (a) {
          if (filteredSSid) {
            if (a.Mac == filteredSSid.Mac)
              a.IsOnline = true;
            else
              a.IsOnline = false;
          }
          else if (a.IsDirectConnected)
            a.IsOnline = false;
          CurObj._appService.UpdateDeviceDetails(a);
          return a;
        });

        CurObj.SyncDevices(BSSID);

      }, function () {
        CurObj.Devices = CurObj.Devices.map(function (a) {
          if (a.IsDirectConnected) {
            a.IsOnline = false;
            CurObj._appService.UpdateDeviceDetails(a);
          }
          return a;
        });
      });
    }
  }

  SpeedChanged(d) {
    if (d.IsOn) {
      this._loading.present();
      if (d.IsDirectConnected) {
        var url = 'http://' + d.IP + '/D0?val=' + d.rangevalue;
        this._http.get(url).subscribe(() => {
          this._appService.UpdateDeviceDetails(d);
          this._loading.dismiss();
        }, () => {
          this._loading.dismiss();
          this.presentToast('Connection error.');
        });
      }
      else {
        this.firebase.database().ref(this.usr.uid + "/" + d.Mac).update({ 'Speed': d.rangevalue }).then(() => {
          this._appService.UpdateDeviceDetails(d);
          this._loading.dismiss();
        }, () => {
          this._loading.dismiss();
          this.presentToast('Connection error.');
        });
      }
    }
  }

  DeviceClicked(d) {
    if (d.IsOnline && d.Category != 'fan') {
      this._loading.present();
      d.IsOn = true;
      if (d.IsDirectConnected) {
        var url = 'http://' + d.IP + '/D0?val=' + d.rangevalue;
        this._http.get(url).subscribe(() => {
          this._appService.UpdateDeviceDetails(d);
          window.localStorage.setItem('DId', d.Mac);
          this._router.navigate([d.Category]);
        }, () => {
          this.presentToast('Connection error.');
        });
      }
      else {
        this.firebase.database().ref(this.usr.uid + "/" + d.Mac).update({ 'Speed': d.rangevalue }).then(() => {
          this._appService.UpdateDeviceDetails(d);
          window.localStorage.setItem('DId', d.Mac);
          this._loading.dismiss();
          this._router.navigate([d.Category]);
        }, () => {
          this._loading.dismiss();
          this.presentToast('Connection error.');
        });
      }
    }
  }

  DeviceOnClicked(d) {
    var url; var dataObj = {};
    this._loading.present();
    if (!d.IsOn) {
      d.iswateron = false;
      d.isswingon = false;
      d.WaterPumpMode = 'Manual';
      dataObj = { 'Speed': 0, 'Water': false, 'Swing': false, 'PumpMode': 'Manual' };
      url = 'http://' + d.IP + '/D0?val=0';
    }
    else {
      url = 'http://' + d.IP + '/D0?val=' + d.rangevalue;
      dataObj = { 'Speed': d.rangevalue };
    }

    if (d.IsDirectConnected) {
      this._http.get(url).subscribe(() => {
        this._appService.UpdateDeviceDetails(d);
        this._loading.dismiss();
      }, (err) => {
        this._loading.dismiss();
        this.presentToast('Connection error.');
      });
    }
    else {
      var dataobj = {}
      this.firebase.database().ref(this.usr.uid + "/" + d.Mac).update(dataObj).then(() => {
        this._appService.UpdateDeviceDetails(d);
        this._loading.dismiss();
      }, () => {
        this._loading.dismiss();
        this.presentToast('Connection error.');
      });
    }
  }

  DeleteDevice(d) {
    this.presentAlertConfirm(d);
  }

  async presentToast(msg) {
    const toast = await this._toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
              this.Devices = this._appService.GetDevices();
              this.presentToast('Device Deleted');
            }
            else {
              if (this.IsMobileOnline) {
                this._loading.present();
                this.firebase.database().ref("Presence/" + this.usr.uid + "/" + d.Mac).update({ 'Reset': 1 }).then(() => {
                  this.firebase.database().ref(this.usr.uid + "/" + d.Mac).remove().then(() => {
                    this._appService.DeleteDevice(d);
                    this.Devices = this._appService.GetDevices();
                    this.presentToast('Device Deleted');
                    this._loading.dismiss();
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

  SyncDevices(BSSID) {
    var obj = this.Devices.filter(d => d.Mac == BSSID.substring(3) && d.IsDirectConnected)[0];
    if (obj) {
      this._loading.present();
      var url = 'http://' + obj.IP + '/GetStatus';
      this._http.get(url).subscribe((response: any) => {
        if (response.D0 == "1" || response.D1 == "1" || response.D2 == "1") {
          obj.IsOn = true;
          if (response.D0 == "1")
            obj.rangevalue = 1;
          else if (response.D1 == "1")
            obj.rangevalue = 2;
          else if (response.D2 == "1")
            obj.rangevalue = 3;

          if (response.D3 == "1")
            obj.iswateron = true;
          else {
            if (response.PumpMode == 'Manual')
              obj.iswateron = false;
            else
              obj.iswateron = true;
          }

          if (response.D4 == "1")
            obj.isswingon = true;
          else
            obj.isswingon = false;

          obj.WaterPumpMode = response.PumpMode;
        }
        else
          obj.IsOn = false;

        this._appService.UpdateDeviceDetails(obj);
        this.Devices = this._appService.GetDevices();
        this._loading.dismiss();

      }, () => {
        this.Devices = this._appService.GetDevices();
        this._loading.dismiss();
      });
    }
  }

  SyncDeviceOnlineOfflineFromFirebase() {
    var CurObj = this; var fbdevices = [];
    var firebaseDevice = this.Devices.filter(d => d.IsDirectConnected == false);
    firebaseDevice.forEach(fd => {
      this.firebase.database().ref('/Presence' + '/' + this.usr.uid + '/' + fd.Mac + "/TimeStamp").on('value', respn => {

        var filteredDevice = fbdevices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (!filteredDevice)
          fbdevices.push({ 'Mac': respn.ref.parent.key, 'TimeStamp': respn.val(), 'OldTimeStamp': 0 });

        filteredDevice = fbdevices.filter(d => d.Mac == respn.ref.parent.key)[0];

        filteredDevice.TimeStamp = respn.val();
        if (filteredDevice.OldTimeStamp == 0)
          filteredDevice.OldTimeStamp = filteredDevice.TimeStamp;


      });
    });

    interval(10000).subscribe(() => {
      CurObj.zone.run(() => {
        fbdevices.forEach(e => {
          var obj = CurObj.Devices.filter(d => d.Mac == e.Mac)[0];
          if (obj) {
            if (e.TimeStamp == e.OldTimeStamp) {
              obj.IsOnline = false;
            }
            else {
              obj.IsOnline = true;
            }

            e.OldTimeStamp = e.TimeStamp;
            CurObj._appService.UpdateDeviceDetails(obj);
            CurObj.Devices = CurObj._appService.GetDevices();
          }
        });
      });

    });
  }

  SyncFromFirebase() {
    var curObj = this;
    var firebaseDevice = this.Devices.filter(d => d.IsDirectConnected == false);
    firebaseDevice.forEach(fd => {
      this.firebase.database().ref(this.usr.uid + '/' + fd.Mac + "/Speed").on('value', respn => {
        var obj = this.Devices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (obj && respn.val() != null) {
          if (respn.val() == 0)
            obj.IsOn = false;
          else {
            obj.IsOn = true;
            obj.rangevalue = respn.val();
          }
        }
        curObj._appService.UpdateDeviceDetails(obj);
      });

      this.firebase.database().ref(this.usr.uid + '/' + fd.Mac + "/Water").on('value', respn => {
        var obj = this.Devices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (obj && respn.val() != null) {
          obj.iswateron = respn.val();
        }
        curObj._appService.UpdateDeviceDetails(obj);
      });

      this.firebase.database().ref(this.usr.uid + '/' + fd.Mac + "/Swing").on('value', respn => {
        var obj = this.Devices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (obj && respn.val() != null) {
          obj.isswingon = respn.val();
        }
        curObj._appService.UpdateDeviceDetails(obj);
      });

      this.firebase.database().ref(this.usr.uid + '/' + fd.Mac + "/PumpMode").on('value', respn => {
        var obj = this.Devices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (obj && respn.val() != null) {
          obj.WaterPumpMode = respn.val();
        }
        curObj._appService.UpdateDeviceDetails(obj);
      });

      this.firebase.database().ref(this.usr.uid + '/' + fd.Mac + "/WaterLevel").on('value', respn => {
        var obj = this.Devices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (obj && respn.val() != null) {
          obj.WaterLevel = respn.val();
        }
        curObj._appService.UpdateDeviceDetails(obj);
      });

      this.firebase.database().ref(this.usr.uid + '/' + fd.Mac + "/Name").on('value', respn => {
        var obj = this.Devices.filter(d => d.Mac == respn.ref.parent.key)[0];
        if (obj && respn.val() != null) {
          obj.Name = respn.val();
        }
        curObj._appService.UpdateDeviceDetails(obj);
      });
    });
  }


  ionViewDidEnter() {

    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });

    this.firebase.database().ref('.info/connected').on('value', resp => {
      this.IsMobileOnline = resp.val();
    });

    if (this.IsLoggedIn) {
      this.SyncUserDeviceFromFirebase();
      this.SyncFromFirebase();
    }
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  LoginRegisterClicked() {
    window.localStorage.removeItem('user');
    this.menu.close();
    this._router.navigate(['login']);
  }

  LogoutClicked() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('Devices');
    this._appService.Devices = [];
    this.menu.close();
    this._router.navigate(['login']);
  }

  SyncUserDeviceFromFirebase() {
    var curObj = this; var localcol = [];
      this.firebase.database().ref(this.usr.uid).on('value', respn => {
        if (respn.val() != null) {
          localcol = [];
          respn.forEach(element => {
            var obj = curObj.Devices.filter(d => d.Mac == element.key)[0];
            var pumpMode = (element.val().PumpMode == null) ? 'Manual' : element.val().PumpMode;
            var speed = (element.val().Speed == null) ? 0 : element.val().Speed;
            var water = (element.val().Water == null) ? false : element.val().Water;
            var swing = (element.val().Swing == null) ? false : element.val().Swing;
            var waterLevel = (element.val().WaterLevel == null) ? 'NA' : element.val().WaterLevel;
            var isOn = speed == 0 ? false : true;

            speed = speed == 0 ? 1 : speed;

            if (!localcol[element.key])
              localcol.push({ 'Mac': element.key });

            if (!obj) {
              curObj._appService.AddDevice(element.val().Name, element.key, element.val().Category, pumpMode, '', false, speed, water, swing, isOn, '', waterLevel);
            }
          });
        }
        else {
          var nfbd=this.Devices.filter(d=>d.IsDirectConnected==true);
          window.localStorage.setItem('Devices',JSON.stringify(nfbd));
          curObj._appService.Devices = nfbd;
        }

        curObj.Devices = this._appService.GetDevices().filter(d => {
          var adevice = localcol.filter(m => m.Mac == d.Mac);
          if ((adevice.length>0) || (d.IsDirectConnected==true))
            return true;
          else
            return false;
        });
        this.SyncDeviceOnlineOfflineFromFirebase();
      });
  }

  MenuCloseButtonClicked() {
    this.menu.close();
  }
}
