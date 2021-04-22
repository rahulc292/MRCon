(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "A3+G":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function() { return HomePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.page */ "zpKS");




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"],
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], HomePageRoutingModule);



/***/ }),

/***/ "WcN3":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-buttons slot=\"primary\">\n      <ion-menu-button menu=\"first\"></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      <div>\n        <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\n        <label>Con</label>\n      </div>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content [fullscreen]=\"true\">\n  <ion-card class=\"ion-padding\">\n    <ion-grid>\n      <ion-row>\n        <br>\n      </ion-row>\n      <ion-row size=\"2\">\n        <ion-col size=\"4\" offset=\"4\"><a [routerLink]=\"['/search']\">\n            <img src=\"../assets/icon/add_device.png\" alt=\"logo-image\"></a>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-card-content>\n      <ion-card-title>\n        <ion-grid>\n          <ion-row>\n            <ion-col style=\"text-align:center;font-size: 15px;\">\n              Add a Smart Device\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-title>\n      <!-- <p style=\"text-align:center;font-size: 10px;\">\n        You have no Smart Devices configured to your account.\n      </p> -->\n    </ion-card-content>\n  </ion-card>\n\n\n  <ion-card *ngIf=\"Devices.length>0\">\n    <ion-list *ngFor=\"let d of Devices\">\n      <ion-item-sliding (ionSwipe)=\"DeleteDevice(d)\">\n        <ion-item>\n          <ion-grid>\n            <ion-row>\n              <ion-col size=\"2\" (click)=\"DeviceClicked()\">\n                <!-- <ion-icon name=\"nuclear\" size=\"large\"></ion-icon> -->\n                <img src=\"../assets/icon/{{d.DeviceImage}}\" style=\"width:32px;margin-left: -5px;\">\n              </ion-col>\n              <ion-col size=\"8\" (click)=\"DeviceClicked(d)\" style=\"text-align: left;margin-left:-12px;margin-top: 5px;\">\n                <b>{{d.Name}} </b>\n              </ion-col>\n              <ion-col size=\"2\" style=\"text-align: right;\">\n                <ion-toggle [disabled]=\"!d.IsOnline\" color=\"primary\" [(ngModel)]=\"d.IsOn\"\n                  (ionChange)=\"DeviceOnClicked(d)\"></ion-toggle>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col style=\"text-align: center;\">\n\n                <span *ngIf=\"!d.IsOnline\" style=\"color: red;font-weight:bold;\">Offline</span>\n                <span *ngIf=\"d.IsOnline\" style=\"color: green;font-weight: bold;\">Online</span>\n\n                <ion-range *ngIf=\"d.Category=='cooler'\" [disabled]=\"!d.IsOn || !d.IsOnline\" [(ngModel)]=\"d.rangevalue\"\n                  min=\"1\" max=\"3\" step=\"1\" snaps=\"true\" pin=\"true\" (ionChange)=\"SpeedChanged(d)\">\n\n                  <ion-icon size=\"small\" slot=\"start\" name=\"speedometer-outline\"></ion-icon>\n                  <ion-icon slot=\"end\" name=\"speedometer-outline\"></ion-icon>\n\n                </ion-range>\n\n                <ion-range *ngIf=\"d.Category!='cooler'\" [disabled]=\"!d.IsOn || !d.IsOnline\" [(ngModel)]=\"d.rangevalue\"\n                  min=\"1\" max=\"5\" step=\"1\" snaps=\"true\" pin=\"true\" (ionChange)=\"SpeedChanged(d)\">\n\n                  <ion-icon size=\"small\" slot=\"start\" name=\"speedometer-outline\"></ion-icon>\n                  <ion-icon slot=\"end\" name=\"speedometer-outline\"></ion-icon>\n\n                </ion-range>\n\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n\n\n        </ion-item>\n        <ion-item-options>\n          <!-- <ion-icon name=\"trash\" size=\"large\"></ion-icon> -->\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n    <!-- </ion-card-content> -->\n  </ion-card>\n</ion-content>\n<ion-menu side=\"end\" menuId=\"first\" contentId=\"main\">\n  <ion-header>\n    <ion-toolbar>\n      <ion-icon style=\"width: 30px;height: 30px;padding-left: 10px;\" (click)=\"MenuCloseButtonClicked()\" name=\"arrow-forward-outline\"></ion-icon>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-row>\n      <ion-col>\n        <div style=\"text-align: center;padding-top: 30px;padding-bottom: 10px;\"><img src=\"../assets/icon/lg.png\"\n            style=\"width: 60px;\">\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <div style=\"text-align: center;\">\n          {{UserEmail}}\n        </div>\n      </ion-col>\n    </ion-row>\n    <br>\n    <ion-list>\n      <ion-item *ngIf=\"!IsLoggedIn\" (click)=\"LoginRegisterClicked()\">\n        <ion-avatar slot=\"start\">\n          <ion-icon style=\"width: 43px;height: 35px;padding-top: 4px;\" name=\"log-in-outline\"></ion-icon>\n        </ion-avatar>\n        <ion-label>Login/Register</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"IsLoggedIn\" (click)=\"LogoutClicked()\">\n        <ion-avatar slot=\"start\">\n          <ion-icon style=\"width: 35px;height: 32px;padding-top: 4px;padding-left: 10px;\" name=\"log-out-outline\">\n          </ion-icon>\n        </ion-avatar>\n        <ion-label>Logout</ion-label>\n      </ion-item>\n    </ion-list>\n    <span style=\"bottom: 20px;position: fixed;right: 10px;font-size: 13px;\">Designed & Developed by MRCon@2021</span>\n  </ion-content>\n</ion-menu>");

/***/ }),

/***/ "ct+p":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "zpKS");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-routing.module */ "A3+G");







let HomePageModule = class HomePageModule {
};
HomePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"]
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
    })
], HomePageModule);



/***/ }),

/***/ "f6od":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n\n/*------ ADDED CSS ---------*/\n\n.slider:after {\n  content: \"OFF\";\n  color: white;\n  display: block;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n  font-size: 10px;\n  font-family: Verdana, sans-serif;\n}\n\ninput:checked + .slider:after {\n  content: \"ON\";\n}\n\nion-range::part(pin) {\n  transform: translate3d(0px, -24px, 0px) scale(1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFFQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUVBLGNBQUE7RUFFQSxTQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtBQUZGOztBQUtBLDZCQUFBOztBQUNFO0VBRUMsY0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGdDQUFBO0FBSEg7O0FBTUU7RUFFRCxhQUFBO0FBSkQ7O0FBTUU7RUFDRCxnREFBQTtBQUhEIiwiZmlsZSI6ImhvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4jY29udGFpbmVyIHN0cm9uZyB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XG59XG5cbiNjb250YWluZXIgcCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDIycHg7XG5cbiAgY29sb3I6ICM4YzhjOGM7XG5cbiAgbWFyZ2luOiAwO1xufVxuXG4jY29udGFpbmVyIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi8qLS0tLS0tIEFEREVEIENTUyAtLS0tLS0tLS0qL1xuICAuc2xpZGVyOmFmdGVyXG4gIHtcbiAgIGNvbnRlbnQ6J09GRic7XG4gICBjb2xvcjogd2hpdGU7XG4gICBkaXNwbGF5OiBibG9jaztcbiAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XG4gICB0b3A6IDUwJTtcbiAgIGxlZnQ6IDUwJTtcbiAgIGZvbnQtc2l6ZTogMTBweDtcbiAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBzYW5zLXNlcmlmO1xuICB9XG4gIFxuICBpbnB1dDpjaGVja2VkICsgLnNsaWRlcjphZnRlclxuICB7ICBcblx0Y29udGVudDonT04nO1xuICB9XG4gIGlvbi1yYW5nZTo6cGFydChwaW4pIHtcblx0dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIC0yNHB4LCAwcHgpIHNjYWxlKDEpO1xuICB9Il19 */");

/***/ }),

/***/ "zpKS":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./home.page.html */ "WcN3");
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.page.scss */ "f6od");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app.service */ "F5nt");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/wifi-wizard-2/ngx */ "ASgJ");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");













let HomePage = class HomePage {
    constructor(_router, _appService, _toastController, _wifiWizard2, alertController, _http, _loading, platform, firebase, ngFireAuth, menu, zone) {
        this._router = _router;
        this._appService = _appService;
        this._toastController = _toastController;
        this._wifiWizard2 = _wifiWizard2;
        this.alertController = alertController;
        this._http = _http;
        this._loading = _loading;
        this.platform = platform;
        this.firebase = firebase;
        this.ngFireAuth = ngFireAuth;
        this.menu = menu;
        this.zone = zone;
        this.Devices = [];
        this.IsMobileOnline = false;
        this.IsLoggedIn = false;
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
        var url;
        var dataObj = {};
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
            var dataobj = {};
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
    presentToast(msg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this._toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
    }
    presentAlertConfirm(d) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
            yield alert.present();
        });
    }
    SyncDevices(BSSID) {
        var obj = this.Devices.filter(d => d.Mac == BSSID.substring(3) && d.IsDirectConnected)[0];
        if (obj) {
            this._loading.present();
            var url = 'http://' + obj.IP + '/GetStatus';
            this._http.get(url).subscribe((response) => {
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
        var CurObj = this;
        var fbdevices = [];
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
        Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["interval"])(10000).subscribe(() => {
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
        var curObj = this;
        var localcol = [];
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
                var nfbd = this.Devices.filter(d => d.IsDirectConnected == true);
                window.localStorage.setItem('Devices', JSON.stringify(nfbd));
                curObj._appService.Devices = nfbd;
            }
            curObj.Devices = this._appService.GetDevices().filter(d => {
                var adevice = localcol.filter(m => m.Mac == d.Mac);
                if ((adevice.length > 0) || (d.IsDirectConnected == true))
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
};
HomePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"] },
    { type: _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_7__["WifiWizard2"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_9__["LoadingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
    { type: _angular_fire__WEBPACK_IMPORTED_MODULE_11__["FirebaseApp"] },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__["AngularFireAuth"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["MenuController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
];
HomePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], HomePage);



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map