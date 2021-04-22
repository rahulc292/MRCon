(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\MRCon\3.0\src\main.ts */"zUnb");


/***/ }),

/***/ "0IeV":
/*!************************************************!*\
  !*** ./src/app/networks/networks.component.ts ***!
  \************************************************/
/*! exports provided: NetworksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworksComponent", function() { return NetworksComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_networks_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./networks.component.html */ "dMWL");
/* harmony import */ var _networks_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./networks.component.css */ "UCjD");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app.service */ "F5nt");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/wifi-wizard-2/ngx */ "ASgJ");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire */ "spgP");











let NetworksComponent = class NetworksComponent {
    constructor(_router, _appService, _toastController, _wifiWizard2, alertController, _loading, _activedRoute, _http, firebase) {
        this._router = _router;
        this._appService = _appService;
        this._toastController = _toastController;
        this._wifiWizard2 = _wifiWizard2;
        this.alertController = alertController;
        this._loading = _loading;
        this._activedRoute = _activedRoute;
        this._http = _http;
        this.firebase = firebase;
        this.Networklist = [];
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
    presentToast(msg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this._toastController.create({
                message: msg,
                duration: 4000
            });
            toast.present();
        });
    }
    presentAlertPrompt(item) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var CurObj = this;
            const alert = yield this.alertController.create({
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
            yield alert.present();
        });
    }
};
NetworksComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"] },
    { type: _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_7__["WifiWizard2"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClient"] },
    { type: _angular_fire__WEBPACK_IMPORTED_MODULE_10__["FirebaseApp"] }
];
NetworksComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_networks_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_networks_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], NetworksComponent);



/***/ }),

/***/ "6aDv":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/cooler/cooler.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      <div>\r\n        <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\r\n        <label>Con</label>\r\n      </div>\r\n    </ion-title>\r\n    <ion-buttons slot=\"end\" (click)=\"EditButtonClicked()\">\r\n        <ion-icon style=\"padding-right: 10px;width: 30px;height: 30px;\" slot=\"icon-only\" md=\"create-outline\"></ion-icon>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-card>\r\n    <ion-card-content>\r\n      <ion-card-title style=\"font-size: 17px;font-weight: bold;\">\r\n        Slide to Control Speed\r\n      </ion-card-title>\r\n      <ion-grid>\r\n        <ion-row>\r\n          <br><br><br><br>\r\n        </ion-row>\r\n        <ion-row offset=\"6\">\r\n          <ion-col style=\"text-align: center;\">\r\n            <div class=\"fan\">\r\n              <div class=\"head\">\r\n                <div class=\"fan__engine\"> <span class=\"center\"></span> </div> <input type=\"checkbox\" hidden\r\n                  [(ngModel)]=\"switch1\" id=\"engine\" checked />\r\n                <div>\r\n                  <div class=\"fan__blades\"> <input type=\"checkbox\" id=\"engine2\" hidden [(ngModel)]=\"switch2\" checked />\r\n                    <div class=\"fan__blades\">\r\n                      <div class=\"center\"></div>\r\n                      <div class=\"blade\"><span></span></div>\r\n                      <div class=\"blade\"><span></span></div>\r\n                      <div class=\"blade\"><span></span></div>\r\n                      <div class=\"blade\"><span></span></div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n        <ion-row>\r\n          <br>\r\n        </ion-row>\r\n        <ion-row>\r\n          <ion-col>\r\n            <ion-range [(ngModel)]=\"Device.rangevalue\" min=\"1\" max=\"3\" step=\"1\" snaps=\"true\" pin=\"true\"\r\n              (ionChange)=\"SpeedChanged()\">\r\n\r\n              <ion-icon size=\"small\" slot=\"start\" name=\"speedometer-outline\"></ion-icon>\r\n              <ion-icon slot=\"end\" name=\"speedometer-outline\"></ion-icon>\r\n\r\n            </ion-range>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n    </ion-card-content>\r\n  </ion-card>\r\n\r\n  <ion-card>\r\n    <ion-card-content>\r\n      <ion-card-title style=\"font-size: 17px;font-weight: bold;\">\r\n\r\n        <ion-row>\r\n          <ion-col>\r\n            Water Pump Control\r\n          </ion-col>\r\n          <ion-col style=\"text-align: right;\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" [disabled]=\"Device.WaterLevel=='0'\" [(ngModel)]=\"Device.iswateron\"\r\n                (click)=\"WaterPumpClicked()\">\r\n              <div class=\"slider round\"></div>\r\n            </label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-card-title>\r\n      <ion-grid>\r\n        <ion-row>\r\n          <br>\r\n        </ion-row>\r\n        <ion-row [hidden]=\"Device.WaterLevel=='NA'\">\r\n          <ion-col>\r\n            <div class=\"tk\" #tk>\r\n              <h3 class=\"text\" #text></h3>\r\n              <div class=\"lq\" #lq>\r\n                <div class=\"ring\" #ring></div>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n        <ion-item>\r\n          <ion-label>Mode</ion-label>\r\n          <ion-select value=\"Manual\" [disabled]=\"!Device.iswateron\" [(ngModel)]=\"Device.WaterPumpMode\"\r\n            (ionChange)=\"WaterPumpModeChanged()\">\r\n            <ion-select-option value=\"Manual\">Manual</ion-select-option>\r\n            <ion-select-option value=\"Automatic\">Automatic</ion-select-option>\r\n          </ion-select>\r\n        </ion-item>\r\n      </ion-grid>\r\n\r\n    </ion-card-content>\r\n  </ion-card>\r\n\r\n  <ion-card>\r\n    <ion-card-content>\r\n      <ion-card-title style=\"font-size: 17px;font-weight: bold;\">\r\n        Swing Control\r\n      </ion-card-title>\r\n      <ion-grid>\r\n        <ion-row>\r\n          <br>\r\n        </ion-row>\r\n        <ion-row>\r\n          <ion-col style=\"text-align: center;\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" [(ngModel)]=\"Device.isswingon\" (click)=\"SwingClicked()\">\r\n              <div class=\"slider round\"></div>\r\n            </label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n    </ion-card-content>\r\n  </ion-card>\r\n</ion-content>");

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCWMNT5LVc25rMV-xONNl11mKvq365THic",
        authDomain: "mrcon-6d3e4.firebaseapp.com",
        databaseURL: "https://mrcon-6d3e4-default-rtdb.firebaseio.com",
        projectId: "mrcon-6d3e4",
        storageBucket: "mrcon-6d3e4.appspot.com",
        messagingSenderId: "70687871203",
        appId: "1:70687871203:web:45414b2b81bd6b2dc4f5d6",
        measurementId: "G-5D99FXKSYY"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "EduL":
/*!*********************************************!*\
  !*** ./src/app/cooler/cooler.component.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n@keyframes spin {\r\n    from {\r\n        transform: rotate(0deg);\r\n    }\r\n\r\n    to {\r\n        transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes off {\r\n    to {\r\n        transform: rotate(380deg);\r\n    }\r\n}\r\n\r\n@keyframes off2 {\r\n    to {\r\n        transform: rotate(880deg);\r\n    }\r\n}\r\n\r\n@keyframes fly {\r\n    to {\r\n        margin-top: 50px;\r\n    }\r\n}\r\n\r\nspan {\r\n    display: block;\r\n}\r\n\r\n.fan {\r\n    z-index: 1;\r\n    margin-top: 13px;\r\n    margin-right: 5px;\r\n    perspective: 500px;\r\n}\r\n\r\n.fan__engine {\r\n    position: absolute;\r\n    bottom: 8px;\r\n    width: 35px;\r\n    height: 35px;\r\n    background: #2f423f;\r\n    border-radius: 50%;\r\n    left: 50%;\r\n    transform: translateX(-50%);\r\n}\r\n\r\n.fan__blades {\r\n    width: 230px;\r\n    height: 150px;\r\n    position: absolute;\r\n    bottom: -50px;\r\n    transition: 2s;\r\n    transform-origin: center center;\r\n    left: calc(50% - 115px);\r\n    z-index: 1;\r\n    animation: spin infinite 0.38s linear forwards;\r\n}\r\n\r\n.fan__blades .fan__blades {\r\n    bottom: 0;\r\n    animation: spin infinite 0.5s linear forwards;\r\n}\r\n\r\n.fan__blades .blade {\r\n    position: absolute;\r\n    width: 15px;\r\n    height: 100%;\r\n    left: 50%;\r\n    transform: translateX(-50%) skewY(25deg);\r\n    perspective: 500px;\r\n    transform-style: preserve-3d;\r\n}\r\n\r\n.fan__blades .blade:nth-child(2) {\r\n    transform: translateX(-50%) rotate(90deg) skewY(25deg);\r\n}\r\n\r\n.fan__blades .blade:nth-child(3) {\r\n    transform: translateX(-50%) rotate(180deg) skewY(25deg);\r\n}\r\n\r\n.fan__blades .blade:nth-child(4) {\r\n    transform: translateX(-50%) rotate(270deg) skewY(25deg);\r\n}\r\n\r\n.fan__blades .blade span {\r\n    width: 100%;\r\n    height: 200%;\r\n    border-radius: 44px;\r\n    background: #ffc114;\r\n    position: absolute;\r\n    top: -66px;\r\n    display: block;\r\n    transform-style: preserve-3d;\r\n    transform: rotateX(81deg);\r\n    overflow: hidden;\r\n}\r\n\r\n.fan__blades .blade span::after {\r\n    width: 50%;\r\n    height: 100%;\r\n    content: \"\";\r\n    display: block;\r\n    background: #fca12a;\r\n    transform: rotate(0deg);\r\n}\r\n\r\n.fan__blades .center {\r\n    position: absolute;\r\n    overflow: hidden;\r\n    width: 20px;\r\n    height: 20px;\r\n    border-radius: 50%;\r\n    left: 50%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%) rotate(45deg);\r\n    background: #32ba7c;\r\n    z-index: 2;\r\n}\r\n\r\n.fan__blades .center::after {\r\n    display: block;\r\n    content: \"\";\r\n    width: 40px;\r\n    height: 20px;\r\n    background: #0aa06e;\r\n}\r\n\r\n.head {\r\n    left: calc(50% - 150px);\r\n}\r\n\r\n#engine:checked+div>div {\r\n    animation: off2 1s ease-out forwards;\r\n}\r\n\r\n#engine:checked+div>span:nth-child(1) {\r\n    transition: 5s all ease-in-out, 1s transform;\r\n    left: 0px;\r\n    top: 0px;\r\n}\r\n\r\n#engine:checked+div>span:nth-child(2) {\r\n    transition: 5s all ease-in-out, 1s transform;\r\n    right: 0px;\r\n    top: 0px;\r\n}\r\n\r\n#engine:checked+div>span:nth-child(3) {\r\n    transition: 7s all ease-in-out, 1s transform;\r\n    right: -50px;\r\n    top: 200px;\r\n}\r\n\r\n#engine2:checked+div {\r\n    animation: off 1s ease-out forwards;\r\n}\r\n\r\n#jack:checked+div {\r\n    transform: translateY(-115px);\r\n}\r\n\r\n#jack:checked+div>div:nth-child(3)>span {\r\n    transform: translateY(115px);\r\n}\r\n\r\n@media screen and (max-width: 900px) {\r\n    .window {\r\n        flex: 1 25% !important;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 800px) {\r\n    .window {\r\n        flex: 1 33.3333333% !important;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 700px) {\r\n    .window {\r\n        flex: 1 50% !important;\r\n    }\r\n}\r\n\r\n.switch {\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n\twidth: 90px;\r\n\theight: 34px;\r\n  }\r\n\r\n.switch input {display:none;}\r\n\r\n.slider {\r\n\tposition: absolute;\r\n\tcursor: pointer;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tbackground-color: #ca2222;\r\n\ttransition: .4s;\r\n\t border-radius: 34px;\r\n  }\r\n\r\n.slider:before {\r\n\tposition: absolute;\r\n\tcontent: \"\";\r\n\theight: 26px;\r\n\twidth: 26px;\r\n\tleft: 4px;\r\n\tbottom: 4px;\r\n\tbackground-color: white;\r\n\ttransition: .4s;\r\n\tborder-radius: 50%;\r\n  }\r\n\r\ninput:checked + .slider {\r\n\tbackground-color: #2ab934;\r\n  }\r\n\r\ninput:focus + .slider {\r\n\tbox-shadow: 0 0 1px #2196F3;\r\n  }\r\n\r\ninput:checked + .slider:before {\r\n\ttransform: translateX(55px);\r\n  }\r\n\r\ninput[type=\"checkbox\"]:disabled + .slider {\r\n    background-color: #989aa2;\r\n  }\r\n\r\n/*------ ADDED CSS ---------*/\r\n\r\n.slider:after\r\n  {\r\n   content:'OFF';\r\n   color: white;\r\n   display: block;\r\n   position: absolute;\r\n   transform: translate(-50%,-50%);\r\n   top: 50%;\r\n   left: 50%;\r\n   font-size: 10px;\r\n   font-family: Verdana, sans-serif;\r\n  }\r\n\r\ninput:checked + .slider:after\r\n  {  \r\n\tcontent:'ON';\r\n  }\r\n\r\nion-range::part(pin) {\r\n\ttransform: translate3d(0px, -24px, 0px) scale(1);\r\n  }\r\n\r\n.tk {\r\n    position: relative;\r\n    width: 40%;\r\n    height: 80px;\r\n    padding-top: 40px;\r\n    margin: 0 auto;\r\n    background: #e4dfdf;\r\n    border-radius: 100%/40px;\r\n    border-bottom: 0px solid #000;\r\n    text-align: center;\r\n    z-index: 1;\r\n    overflow: hidden;\r\n}\r\n\r\n.lq {\r\n    position: absolute;\r\n    background: #009ae6;\r\n    width: 100%;\r\n    height: 0;\r\n    bottom: 0;\r\n    border-radius: 100%/28px;\r\n    border-bottom: 3px solid #000;\r\n}\r\n\r\n.ring {\r\n    position: absolute;\r\n    border-radius: 100%;\r\n    top: 0px;\r\n    width: 100%;\r\n    height: 40%;\r\n    content: '';\r\n    border: 1px solid #000;\r\n}\r\n\r\n.text {\r\n    display: block;\r\n    position: absolute;\r\n    top: 45%;\r\n    left: 44%;\r\n    z-index: 1;\r\n    color: black;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvb2xlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSTtRQUNJLHVCQUF1QjtJQUMzQjs7SUFFQTtRQUNJLHlCQUF5QjtJQUM3QjtBQUNKOztBQUVBO0lBQ0k7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSjs7QUFFQTtJQUNJO1FBQ0kseUJBQXlCO0lBQzdCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGdCQUFnQjtJQUNwQjtBQUNKOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCwyQkFBMkI7QUFDL0I7O0FBR0E7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsY0FBYztJQUNkLCtCQUErQjtJQUMvQix1QkFBdUI7SUFDdkIsVUFBVTtJQUNWLDhDQUE4QztBQUNsRDs7QUFFQTtJQUNJLFNBQVM7SUFDVCw2Q0FBNkM7QUFDakQ7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1Qsd0NBQXdDO0lBQ3hDLGtCQUFrQjtJQUNsQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxzREFBc0Q7QUFDMUQ7O0FBRUE7SUFDSSx1REFBdUQ7QUFDM0Q7O0FBRUE7SUFDSSx1REFBdUQ7QUFDM0Q7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixjQUFjO0lBQ2QsNEJBQTRCO0lBQzVCLHlCQUF5QjtJQUN6QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsWUFBWTtJQUNaLFdBQVc7SUFDWCxjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsU0FBUztJQUNULFFBQVE7SUFDUiw4Q0FBOEM7SUFDOUMsbUJBQW1CO0lBQ25CLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGNBQWM7SUFDZCxXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSw0Q0FBNEM7SUFDNUMsU0FBUztJQUNULFFBQVE7QUFDWjs7QUFFQTtJQUNJLDRDQUE0QztJQUM1QyxVQUFVO0lBQ1YsUUFBUTtBQUNaOztBQUVBO0lBQ0ksNENBQTRDO0lBQzVDLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSTtRQUNJLHNCQUFzQjtJQUMxQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSw4QkFBOEI7SUFDbEM7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksc0JBQXNCO0lBQzFCO0FBQ0o7O0FBT0E7Q0FDQyxrQkFBa0I7Q0FDbEIscUJBQXFCO0NBQ3JCLFdBQVc7Q0FDWCxZQUFZO0VBQ1g7O0FBRUEsZUFBZSxZQUFZLENBQUM7O0FBRTVCO0NBQ0Qsa0JBQWtCO0NBQ2xCLGVBQWU7Q0FDZixNQUFNO0NBQ04sT0FBTztDQUNQLFFBQVE7Q0FDUixTQUFTO0NBQ1QseUJBQXlCO0NBRXpCLGVBQWU7RUFDZCxtQkFBbUI7RUFDbkI7O0FBRUE7Q0FDRCxrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLFlBQVk7Q0FDWixXQUFXO0NBQ1gsU0FBUztDQUNULFdBQVc7Q0FDWCx1QkFBdUI7Q0FFdkIsZUFBZTtDQUNmLGtCQUFrQjtFQUNqQjs7QUFFQTtDQUNELHlCQUF5QjtFQUN4Qjs7QUFFQTtDQUNELDJCQUEyQjtFQUMxQjs7QUFFQTtDQUdELDJCQUEyQjtFQUMxQjs7QUFFQTtJQUNFLHlCQUF5QjtFQUMzQjs7QUFFQSw2QkFBNkI7O0FBQzdCOztHQUVDLGFBQWE7R0FDYixZQUFZO0dBQ1osY0FBYztHQUNkLGtCQUFrQjtHQUNsQiwrQkFBK0I7R0FDL0IsUUFBUTtHQUNSLFNBQVM7R0FDVCxlQUFlO0dBQ2YsZ0NBQWdDO0VBQ2pDOztBQUVBOztDQUVELFlBQVk7RUFDWDs7QUFDQTtDQUNELGdEQUFnRDtFQUMvQzs7QUFHQTtJQUNFLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxTQUFTO0lBQ1QsU0FBUztJQUNULHdCQUF3QjtJQUN4Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLFFBQVE7SUFDUixXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsVUFBVTtJQUNWLFlBQVk7QUFDaEIiLCJmaWxlIjoiY29vbGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbkBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgICBmcm9tIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICAgIH1cclxuXHJcbiAgICB0byB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBvZmYge1xyXG4gICAgdG8ge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM4MGRlZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgb2ZmMiB7XHJcbiAgICB0byB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoODgwZGVnKTtcclxuICAgIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBmbHkge1xyXG4gICAgdG8ge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDUwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbnNwYW4ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5mYW4ge1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIG1hcmdpbi10b3A6IDEzcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICAgIHBlcnNwZWN0aXZlOiA1MDBweDtcclxufVxyXG5cclxuLmZhbl9fZW5naW5lIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogOHB4O1xyXG4gICAgd2lkdGg6IDM1cHg7XHJcbiAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMmY0MjNmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG59XHJcblxyXG5cclxuLmZhbl9fYmxhZGVzIHtcclxuICAgIHdpZHRoOiAyMzBweDtcclxuICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IC01MHB4O1xyXG4gICAgdHJhbnNpdGlvbjogMnM7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xyXG4gICAgbGVmdDogY2FsYyg1MCUgLSAxMTVweCk7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgYW5pbWF0aW9uOiBzcGluIGluZmluaXRlIDAuMzhzIGxpbmVhciBmb3J3YXJkcztcclxufVxyXG5cclxuLmZhbl9fYmxhZGVzIC5mYW5fX2JsYWRlcyB7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBhbmltYXRpb246IHNwaW4gaW5maW5pdGUgMC41cyBsaW5lYXIgZm9yd2FyZHM7XHJcbn1cclxuXHJcbi5mYW5fX2JsYWRlcyAuYmxhZGUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDE1cHg7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgc2tld1koMjVkZWcpO1xyXG4gICAgcGVyc3BlY3RpdmU6IDUwMHB4O1xyXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcclxufVxyXG5cclxuLmZhbl9fYmxhZGVzIC5ibGFkZTpudGgtY2hpbGQoMikge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSg5MGRlZykgc2tld1koMjVkZWcpO1xyXG59XHJcblxyXG4uZmFuX19ibGFkZXMgLmJsYWRlOm50aC1jaGlsZCgzKSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDE4MGRlZykgc2tld1koMjVkZWcpO1xyXG59XHJcblxyXG4uZmFuX19ibGFkZXMgLmJsYWRlOm50aC1jaGlsZCg0KSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDI3MGRlZykgc2tld1koMjVkZWcpO1xyXG59XHJcblxyXG4uZmFuX19ibGFkZXMgLmJsYWRlIHNwYW4ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDIwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0NHB4O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmYzExNDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogLTY2cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoODFkZWcpO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmZhbl9fYmxhZGVzIC5ibGFkZSBzcGFuOjphZnRlciB7XHJcbiAgICB3aWR0aDogNTAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYmFja2dyb3VuZDogI2ZjYTEyYTtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG59XHJcblxyXG4uZmFuX19ibGFkZXMgLmNlbnRlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSg0NWRlZyk7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzJiYTdjO1xyXG4gICAgei1pbmRleDogMjtcclxufVxyXG5cclxuLmZhbl9fYmxhZGVzIC5jZW50ZXI6OmFmdGVyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgYmFja2dyb3VuZDogIzBhYTA2ZTtcclxufVxyXG5cclxuLmhlYWQge1xyXG4gICAgbGVmdDogY2FsYyg1MCUgLSAxNTBweCk7XHJcbn1cclxuXHJcbiNlbmdpbmU6Y2hlY2tlZCtkaXY+ZGl2IHtcclxuICAgIGFuaW1hdGlvbjogb2ZmMiAxcyBlYXNlLW91dCBmb3J3YXJkcztcclxufVxyXG5cclxuI2VuZ2luZTpjaGVja2VkK2Rpdj5zcGFuOm50aC1jaGlsZCgxKSB7XHJcbiAgICB0cmFuc2l0aW9uOiA1cyBhbGwgZWFzZS1pbi1vdXQsIDFzIHRyYW5zZm9ybTtcclxuICAgIGxlZnQ6IDBweDtcclxuICAgIHRvcDogMHB4O1xyXG59XHJcblxyXG4jZW5naW5lOmNoZWNrZWQrZGl2PnNwYW46bnRoLWNoaWxkKDIpIHtcclxuICAgIHRyYW5zaXRpb246IDVzIGFsbCBlYXNlLWluLW91dCwgMXMgdHJhbnNmb3JtO1xyXG4gICAgcmlnaHQ6IDBweDtcclxuICAgIHRvcDogMHB4O1xyXG59XHJcblxyXG4jZW5naW5lOmNoZWNrZWQrZGl2PnNwYW46bnRoLWNoaWxkKDMpIHtcclxuICAgIHRyYW5zaXRpb246IDdzIGFsbCBlYXNlLWluLW91dCwgMXMgdHJhbnNmb3JtO1xyXG4gICAgcmlnaHQ6IC01MHB4O1xyXG4gICAgdG9wOiAyMDBweDtcclxufVxyXG5cclxuI2VuZ2luZTI6Y2hlY2tlZCtkaXYge1xyXG4gICAgYW5pbWF0aW9uOiBvZmYgMXMgZWFzZS1vdXQgZm9yd2FyZHM7XHJcbn1cclxuXHJcbiNqYWNrOmNoZWNrZWQrZGl2IHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTE1cHgpO1xyXG59XHJcblxyXG4jamFjazpjaGVja2VkK2Rpdj5kaXY6bnRoLWNoaWxkKDMpPnNwYW4ge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDExNXB4KTtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTAwcHgpIHtcclxuICAgIC53aW5kb3cge1xyXG4gICAgICAgIGZsZXg6IDEgMjUlICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDgwMHB4KSB7XHJcbiAgICAud2luZG93IHtcclxuICAgICAgICBmbGV4OiAxIDMzLjMzMzMzMzMlICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XHJcbiAgICAud2luZG93IHtcclxuICAgICAgICBmbGV4OiAxIDUwJSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi5zd2l0Y2gge1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcblx0d2lkdGg6IDkwcHg7XHJcblx0aGVpZ2h0OiAzNHB4O1xyXG4gIH1cclxuICBcclxuICAuc3dpdGNoIGlucHV0IHtkaXNwbGF5Om5vbmU7fVxyXG4gIFxyXG4gIC5zbGlkZXIge1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0dG9wOiAwO1xyXG5cdGxlZnQ6IDA7XHJcblx0cmlnaHQ6IDA7XHJcblx0Ym90dG9tOiAwO1xyXG5cdGJhY2tncm91bmQtY29sb3I6ICNjYTIyMjI7XHJcblx0LXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XHJcblx0dHJhbnNpdGlvbjogLjRzO1xyXG5cdCBib3JkZXItcmFkaXVzOiAzNHB4O1xyXG4gIH1cclxuICBcclxuICAuc2xpZGVyOmJlZm9yZSB7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdGNvbnRlbnQ6IFwiXCI7XHJcblx0aGVpZ2h0OiAyNnB4O1xyXG5cdHdpZHRoOiAyNnB4O1xyXG5cdGxlZnQ6IDRweDtcclxuXHRib3R0b206IDRweDtcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuXHQtd2Via2l0LXRyYW5zaXRpb246IC40cztcclxuXHR0cmFuc2l0aW9uOiAuNHM7XHJcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xyXG4gIH1cclxuICBcclxuICBpbnB1dDpjaGVja2VkICsgLnNsaWRlciB7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogIzJhYjkzNDtcclxuICB9XHJcbiAgXHJcbiAgaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcclxuXHRib3gtc2hhZG93OiAwIDAgMXB4ICMyMTk2RjM7XHJcbiAgfVxyXG4gIFxyXG4gIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XHJcblx0LXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XHJcblx0LW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcclxuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTVweCk7XHJcbiAgfVxyXG5cclxuICBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06ZGlzYWJsZWQgKyAuc2xpZGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ODlhYTI7XHJcbiAgfVxyXG4gIFxyXG4gIC8qLS0tLS0tIEFEREVEIENTUyAtLS0tLS0tLS0qL1xyXG4gIC5zbGlkZXI6YWZ0ZXJcclxuICB7XHJcbiAgIGNvbnRlbnQ6J09GRic7XHJcbiAgIGNvbG9yOiB3aGl0ZTtcclxuICAgZGlzcGxheTogYmxvY2s7XHJcbiAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTtcclxuICAgdG9wOiA1MCU7XHJcbiAgIGxlZnQ6IDUwJTtcclxuICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICBmb250LWZhbWlseTogVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICB9XHJcbiAgXHJcbiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YWZ0ZXJcclxuICB7ICBcclxuXHRjb250ZW50OidPTic7XHJcbiAgfVxyXG4gIGlvbi1yYW5nZTo6cGFydChwaW4pIHtcclxuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgLTI0cHgsIDBweCkgc2NhbGUoMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLnRrIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiA0MCU7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNDBweDtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgYmFja2dyb3VuZDogI2U0ZGZkZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCUvNDBweDtcclxuICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjMDAwO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5scSB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDA5YWU2O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlLzI4cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzAwMDtcclxufVxyXG5cclxuLnJpbmcge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgIHRvcDogMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQwJTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcclxufVxyXG5cclxuLnRleHQge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDQ1JTtcclxuICAgIGxlZnQ6IDQ0JTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn0iXX0= */");

/***/ }),

/***/ "Ehvd":
/*!********************************************!*\
  !*** ./src/app/cooler/cooler.component.ts ***!
  \********************************************/
/*! exports provided: CoolerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoolerComponent", function() { return CoolerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_cooler_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./cooler.component.html */ "6aDv");
/* harmony import */ var _cooler_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cooler.component.css */ "EduL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.service */ "F5nt");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/wifi-wizard-2/ngx */ "ASgJ");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire */ "spgP");











let CoolerComponent = class CoolerComponent {
    constructor(_appService, _http, _loading, _toastController, _wifiWizard2, _router, platform, animationCtrl, firebase, zone) {
        this._appService = _appService;
        this._http = _http;
        this._loading = _loading;
        this._toastController = _toastController;
        this._wifiWizard2 = _wifiWizard2;
        this._router = _router;
        this.platform = platform;
        this.animationCtrl = animationCtrl;
        this.firebase = firebase;
        this.zone = zone;
        this.switch2 = false;
        this.switch1 = true;
        this.Device = {};
        this.OldOnlineOfflineStatus = true;
        this.OldOnOffStatus = true;
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
    presentToast(msg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this._toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
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
            this._http.get(url).subscribe((response) => {
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
        this._http.get(url).subscribe((response) => {
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
    EditButtonClicked() {
        this._router.navigate(['edit']);
    }
};
CoolerComponent.ctorParameters = () => [
    { type: _app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ToastController"] },
    { type: _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_8__["WifiWizard2"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AnimationController"] },
    { type: _angular_fire__WEBPACK_IMPORTED_MODULE_10__["FirebaseApp"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
];
CoolerComponent.propDecorators = {
    tk: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['tk',] }],
    text: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['text',] }],
    lq: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['lq',] }],
    ring: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['ring',] }]
};
CoolerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_cooler_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_cooler_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CoolerComponent);



/***/ }),

/***/ "F5nt":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


let AppService = class AppService {
    constructor() {
        this.Devices = [];
        var data = window.localStorage.getItem('Devices');
        if (data)
            this.Devices = JSON.parse(data);
        else
            this.Devices = [];
    }
    AddDevice(Name, Mac, Category, WaterPumpMode, IP, IsDirectConnected, rangevalue, iswateron, isswingon, IsOn, SSID, WaterLevel) {
        var obj = this.Devices.filter(d => d.Mac == Mac);
        if (obj.length > 0)
            return "Device already exists.";
        else {
            var device = {};
            if (Category == 'cooler')
                device = { 'Name': Name, 'SSID': SSID, 'Mac': Mac, 'Category': Category, 'IsOn': IsOn, 'rangevalue': rangevalue, 'iswateron': iswateron, 'isswingon': isswingon, 'IsOnline': false, 'DeviceImage': 'cooler.png', 'WaterPumpMode': WaterPumpMode, 'IP': IP, 'IsDirectConnected': IsDirectConnected, 'WaterLevel': WaterLevel };
            else
                device = { 'Name': Name, 'SSID': SSID, 'Mac': Mac, 'Category': Category, 'IsOn': IsOn, 'rangevalue': rangevalue, 'iswateron': iswateron, 'isswingon': isswingon, 'IsOnline': false, 'DeviceImage': 'fan.png', 'WaterPumpMode': WaterPumpMode, 'IP': IP, 'IsDirectConnected': IsDirectConnected, 'WaterLevel': WaterLevel };
            this.Devices.push(device);
            window.localStorage.setItem('Devices', JSON.stringify(this.Devices));
            return "Device Added Successfully.";
        }
    }
    GetDevices() {
        return this.Devices;
    }
    GetDeviceDetails(Mac) {
        return this.Devices.filter(d => d.Mac == Mac)[0];
    }
    UpdateDeviceDetails(data) {
        var obj = this.Devices.filter(d => d.Mac == data.Mac)[0];
        this.Devices[this.Devices.indexOf(obj)] = data;
        window.localStorage.setItem('Devices', JSON.stringify(this.Devices));
    }
    DeleteDevice(data) {
        var obj = this.Devices.filter(d => d.Mac == data.Mac)[0];
        this.Devices.splice(this.Devices.indexOf(obj), 1);
        window.localStorage.setItem('Devices', JSON.stringify(this.Devices));
    }
};
AppService.ctorParameters = () => [];
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], AppService);



/***/ }),

/***/ "I/Hr":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/search/search.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"category\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      <div>\r\n        <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\r\n        <label>Con</label>\r\n      </div>\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content [fullscreen]=\"true\">\r\n  <ion-card style=\"height: 97%;overflow-y: scroll;\">\r\n    <ion-card-content>\r\n      <ion-card-title *ngIf=\"Networklist.length==0\">\r\n        <ion-grid>\r\n          <ion-row>\r\n            <br><br>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col style=\"text-align:center;font-size: 17px;font-weight: bold;\">\r\n              Looking for Devices\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </ion-card-title>\r\n      <ion-row *ngIf=\"Networklist.length==0\">\r\n        <ion-col>\r\n          <div class=\"loader\">Loading...</div>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row *ngIf=\"Networklist.length>0\">\r\n        <ion-col>\r\n          <ion-item *ngFor=\"let item of Networklist\" button (click)=\"SSIDClicked(item)\">\r\n            <ion-avatar slot=\"start\">\r\n              <img src=\"../assets/icon/{{item.icon}}\" style=\"width: 30px;height: 30px;margin-top: 8px;\">\r\n            </ion-avatar>\r\n            <ion-label style=\"font-weight: bold;\">\r\n              {{item.Name}}\r\n            </ion-label>\r\n          </ion-item>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n        <ion-col>\r\n          <ion-button expand=\"full\" style=\"bottom: 20px;position: fixed;right: 20px;left: 20px;\" color=\"primary\" (click)=\"ScanClicked()\">Scan Again</ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-card-content>\r\n  </ion-card>\r\n  \r\n</ion-content>\r\n");

/***/ }),

/***/ "MYgn":
/*!****************************************!*\
  !*** ./src/app/edit/edit.component.ts ***!
  \****************************************/
/*! exports provided: EditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditComponent", function() { return EditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_edit_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./edit.component.html */ "fFVb");
/* harmony import */ var _edit_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit.component.css */ "uPFI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.service */ "F5nt");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");









let EditComponent = class EditComponent {
    constructor(_appService, firebase, _loading, _toastController, alertController, _router) {
        this._appService = _appService;
        this.firebase = firebase;
        this._loading = _loading;
        this._toastController = _toastController;
        this.alertController = alertController;
        this._router = _router;
        this.Device = {};
        this.IsMobileOnline = false;
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
    presentToast(msg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this._toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
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
            yield alert.present();
        });
    }
};
EditComponent.ctorParameters = () => [
    { type: _app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"] },
    { type: _angular_fire__WEBPACK_IMPORTED_MODULE_5__["FirebaseApp"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] }
];
EditComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_edit_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_edit_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], EditComponent);



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let AppComponent = class AppComponent {
    constructor() {
    }
};
AppComponent.ctorParameters = () => [];
AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AppComponent);



/***/ }),

/***/ "UCjD":
/*!*************************************************!*\
  !*** ./src/app/networks/networks.component.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".loader,\r\n.loader:before,\r\n.loader:after {\r\n  border-radius: 50%;\r\n  width: 2.5em;\r\n  height: 2.5em;\r\n  animation-fill-mode: both;\r\n  animation: load7 1.8s infinite ease-in-out;\r\n}\r\n.loader {\r\n  color: #1a48d1;\r\n  font-size: 10px;\r\n  margin: 80px auto;\r\n  position: relative;\r\n  text-indent: -9999em;\r\n  transform: translateZ(0);\r\n  animation-delay: -0.16s;\r\n}\r\n.loader:before,\r\n.loader:after {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n}\r\n.loader:before {\r\n  left: -3.5em;\r\n  animation-delay: -0.32s;\r\n}\r\n.loader:after {\r\n  left: 3.5em;\r\n}\r\n@keyframes load7 {\r\n  0%,\r\n  80%,\r\n  100% {\r\n    box-shadow: 0 2.5em 0 -1.3em;\r\n  }\r\n  40% {\r\n    box-shadow: 0 2.5em 0 0;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldHdvcmtzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztFQUdFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUViLHlCQUF5QjtFQUV6QiwwQ0FBMEM7QUFDNUM7QUFDQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFHcEIsd0JBQXdCO0VBRXhCLHVCQUF1QjtBQUN6QjtBQUNBOztFQUVFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsTUFBTTtBQUNSO0FBQ0E7RUFDRSxZQUFZO0VBRVosdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7QUFXQTtFQUNFOzs7SUFHRSw0QkFBNEI7RUFDOUI7RUFDQTtJQUNFLHVCQUF1QjtFQUN6QjtBQUNGIiwiZmlsZSI6Im5ldHdvcmtzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9hZGVyLFxyXG4ubG9hZGVyOmJlZm9yZSxcclxuLmxvYWRlcjphZnRlciB7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiAyLjVlbTtcclxuICBoZWlnaHQ6IDIuNWVtO1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcclxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkNyAxLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gIGFuaW1hdGlvbjogbG9hZDcgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxufVxyXG4ubG9hZGVyIHtcclxuICBjb2xvcjogIzFhNDhkMTtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgbWFyZ2luOiA4MHB4IGF1dG87XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRleHQtaW5kZW50OiAtOTk5OWVtO1xyXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xyXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnM7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnM7XHJcbn1cclxuLmxvYWRlcjpiZWZvcmUsXHJcbi5sb2FkZXI6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbn1cclxuLmxvYWRlcjpiZWZvcmUge1xyXG4gIGxlZnQ6IC0zLjVlbTtcclxuICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG4gIGFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG59XHJcbi5sb2FkZXI6YWZ0ZXIge1xyXG4gIGxlZnQ6IDMuNWVtO1xyXG59XHJcbkAtd2Via2l0LWtleWZyYW1lcyBsb2FkNyB7XHJcbiAgMCUsXHJcbiAgODAlLFxyXG4gIDEwMCUge1xyXG4gICAgYm94LXNoYWRvdzogMCAyLjVlbSAwIC0xLjNlbTtcclxuICB9XHJcbiAgNDAlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMi41ZW0gMCAwO1xyXG4gIH1cclxufVxyXG5Aa2V5ZnJhbWVzIGxvYWQ3IHtcclxuICAwJSxcclxuICA4MCUsXHJcbiAgMTAwJSB7XHJcbiAgICBib3gtc2hhZG93OiAwIDIuNWVtIDAgLTEuM2VtO1xyXG4gIH1cclxuICA0MCUge1xyXG4gICAgYm94LXNoYWRvdzogMCAyLjVlbSAwIDA7XHJcbiAgfVxyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "UEwX":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setup/setup.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n    <ion-toolbar>\r\n      <ion-buttons slot=\"start\">\r\n        <ion-back-button defaultHref=\"home\"></ion-back-button>\r\n      </ion-buttons>\r\n      <ion-title>\r\n        <div>\r\n          <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\r\n          <label>Con</label>\r\n        </div>\r\n      </ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <ion-content [fullscreen]=\"true\">\r\n    <ion-card style=\"height:97%\">\r\n        <ion-card-content>\r\n          <ion-card-title style=\"font-size: 17px;font-weight: bold;text-align: center;\">\r\n            <br>\r\n              Begin your Device setup<br><br>\r\n              <p>Let's get started. Choose how would you like to connect your device.</p>       \r\n          </ion-card-title>\r\n          <br><br>\r\n          <ion-grid>\r\n            <ion-row>\r\n              <br>\r\n            </ion-row>\r\n            <ion-row size=\"2\">\r\n              <ion-col size=\"4\" offset=\"4\"><a [routerLink]=\"['/category']\">\r\n                  <img src=\"../assets/icon/router.gif\" alt=\"logo-image\"></a>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row *ngIf=\"IsLoggedIn\">\r\n                <ion-col>\r\n                  <ion-button expand=\"full\" style=\"bottom: 75px;position: fixed;right: 20px;left: 20px;\" color=\"primary\" (click)=\"RouterConnectButtonClicked()\">I have a Wi-Fi router</ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col>\r\n                  <ion-button expand=\"full\" style=\"bottom: 25px;position: fixed;right: 20px;left: 20px;\" color=\"secondary\" (click)=\"DirectConnectButtonClicked()\">Connect Directly with my Mobile</ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n          </ion-grid>\r\n          </ion-card-content>\r\n    </ion-card>\r\n</ion-content>");

/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-app>\n  <ion-router-outlet id=\"main\"></ion-router-outlet>\n  <ion-router-outlet></ion-router-outlet>\n</ion-app>\n");

/***/ }),

/***/ "WuAh":
/*!*********************************************!*\
  !*** ./src/app/search/search.component.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".loader,\r\n.loader:before,\r\n.loader:after {\r\n  border-radius: 50%;\r\n  width: 2.5em;\r\n  height: 2.5em;\r\n  animation-fill-mode: both;\r\n  animation: load7 1.8s infinite ease-in-out;\r\n}\r\n.loader {\r\n  color: #1a48d1;\r\n  font-size: 10px;\r\n  margin: 80px auto;\r\n  position: relative;\r\n  text-indent: -9999em;\r\n  transform: translateZ(0);\r\n  animation-delay: -0.16s;\r\n}\r\n.loader:before,\r\n.loader:after {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n}\r\n.loader:before {\r\n  left: -3.5em;\r\n  animation-delay: -0.32s;\r\n}\r\n.loader:after {\r\n  left: 3.5em;\r\n}\r\n@keyframes load7 {\r\n  0%,\r\n  80%,\r\n  100% {\r\n    box-shadow: 0 2.5em 0 -1.3em;\r\n  }\r\n  40% {\r\n    box-shadow: 0 2.5em 0 0;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFHRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGFBQWE7RUFFYix5QkFBeUI7RUFFekIsMENBQTBDO0FBQzVDO0FBQ0E7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBR3BCLHdCQUF3QjtFQUV4Qix1QkFBdUI7QUFDekI7QUFDQTs7RUFFRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLE1BQU07QUFDUjtBQUNBO0VBQ0UsWUFBWTtFQUVaLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsV0FBVztBQUNiO0FBV0E7RUFDRTs7O0lBR0UsNEJBQTRCO0VBQzlCO0VBQ0E7SUFDRSx1QkFBdUI7RUFDekI7QUFDRiIsImZpbGUiOiJzZWFyY2guY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2FkZXIsXHJcbi5sb2FkZXI6YmVmb3JlLFxyXG4ubG9hZGVyOmFmdGVyIHtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgd2lkdGg6IDIuNWVtO1xyXG4gIGhlaWdodDogMi41ZW07XHJcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XHJcbiAgLXdlYmtpdC1hbmltYXRpb246IGxvYWQ3IDEuOHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgYW5pbWF0aW9uOiBsb2FkNyAxLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG59XHJcbi5sb2FkZXIge1xyXG4gIGNvbG9yOiAjMWE0OGQxO1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBtYXJnaW46IDgwcHggYXV0bztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdGV4dC1pbmRlbnQ6IC05OTk5ZW07XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxuICBhbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxufVxyXG4ubG9hZGVyOmJlZm9yZSxcclxuLmxvYWRlcjphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxufVxyXG4ubG9hZGVyOmJlZm9yZSB7XHJcbiAgbGVmdDogLTMuNWVtO1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnM7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnM7XHJcbn1cclxuLmxvYWRlcjphZnRlciB7XHJcbiAgbGVmdDogMy41ZW07XHJcbn1cclxuQC13ZWJraXQta2V5ZnJhbWVzIGxvYWQ3IHtcclxuICAwJSxcclxuICA4MCUsXHJcbiAgMTAwJSB7XHJcbiAgICBib3gtc2hhZG93OiAwIDIuNWVtIDAgLTEuM2VtO1xyXG4gIH1cclxuICA0MCUge1xyXG4gICAgYm94LXNoYWRvdzogMCAyLjVlbSAwIDA7XHJcbiAgfVxyXG59XHJcbkBrZXlmcmFtZXMgbG9hZDcge1xyXG4gIDAlLFxyXG4gIDgwJSxcclxuICAxMDAlIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMi41ZW0gMCAtMS4zZW07XHJcbiAgfVxyXG4gIDQwJSB7XHJcbiAgICBib3gtc2hhZG93OiAwIDIuNWVtIDAgMDtcclxuICB9XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search/search.component */ "tq2C");
/* harmony import */ var _cooler_cooler_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cooler/cooler.component */ "Ehvd");
/* harmony import */ var _setup_setup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./setup/setup.component */ "uMz8");
/* harmony import */ var _networks_networks_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./networks/networks.component */ "0IeV");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./edit/edit.component */ "MYgn");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/wifi-wizard-2/ngx */ "ASgJ");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../environments/environment */ "AytR");




















let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _search_search_component__WEBPACK_IMPORTED_MODULE_7__["SearchComponent"], _cooler_cooler_component__WEBPACK_IMPORTED_MODULE_8__["CoolerComponent"], _setup_setup_component__WEBPACK_IMPORTED_MODULE_9__["SetupComponent"], _networks_networks_component__WEBPACK_IMPORTED_MODULE_10__["NetworksComponent"],
            _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"], _edit_edit_component__WEBPACK_IMPORTED_MODULE_12__["EditComponent"]],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_16__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_19__["environment"].firebase), _angular_fire_auth__WEBPACK_IMPORTED_MODULE_17__["AngularFireAuthModule"],
            _angular_fire_database__WEBPACK_IMPORTED_MODULE_18__["AngularFireDatabaseModule"]],
        providers: [{ provide: _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouteReuseStrategy"], useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicRouteStrategy"] }, _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_14__["WifiWizard2"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
    })
], AppModule);



/***/ }),

/***/ "dMWL":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/networks/networks.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n    <ion-toolbar>\r\n        <ion-buttons slot=\"start\">\r\n            <ion-back-button defaultHref=\"category\"></ion-back-button>\r\n        </ion-buttons>\r\n        <ion-title>\r\n            <div>\r\n                <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\r\n                <label>Con</label>\r\n            </div>\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n<ion-content [fullscreen]=\"true\">\r\n    <ion-card style=\"height: 97%;\">\r\n        <ion-card-content style=\"height: 85%;overflow-y: scroll;\">\r\n            <ion-card-title *ngIf=\"Networklist.length==0\">\r\n                <ion-grid>\r\n                    <ion-row>\r\n                        <br><br>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col style=\"text-align:center;font-size: 17px;font-weight: bold;\">\r\n                            Looking for Wifi\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-card-title>\r\n            <ion-row *ngIf=\"Networklist.length==0\">\r\n                <ion-col>\r\n                    <div class=\"loader\">Loading...</div>\r\n                </ion-col>\r\n            </ion-row>\r\n            <ion-row *ngIf=\"Networklist.length>0\">\r\n                <ion-col>\r\n                    <div>\r\n                        <ion-item *ngFor=\"let item of Networklist\" button (click)=\"SSIDClicked(item)\">\r\n                            <ion-avatar slot=\"start\">\r\n                                <img src=\"../assets/icon/{{item.icon}}\" style=\"height: 30px;margin-top: 8px;\">\r\n                            </ion-avatar>\r\n                            <ion-label style=\"font-weight: bold;\">\r\n                                {{item.Name}}\r\n                            </ion-label>\r\n                        </ion-item>\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>   \r\n        </ion-card-content>\r\n        <ion-row>\r\n            <ion-col>\r\n                <ion-button expand=\"full\" style=\"bottom: 20px;position: fixed;right: 20px;left: 20px;\"\r\n                    color=\"primary\" (click)=\"ScanClicked()\">Scan Again</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-card>\r\n\r\n</ion-content>");

/***/ }),

/***/ "f67T":
/*!***********************************************!*\
  !*** ./src/app/services/authGuard.service.ts ***!
  \***********************************************/
/*! exports provided: HomeGuardService, LoginGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeGuardService", function() { return HomeGuardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginGuardService", function() { return LoginGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "lGQG");




let HomeGuardService = class HomeGuardService {
    constructor(_router, authService) {
        this._router = _router;
        this.authService = authService;
    }
    canActivate(route, state) {
        if (!this.authService.isLoggedIn) {
            this._router.navigate(['login']);
            return false;
        }
        return true;
    }
};
HomeGuardService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
];
HomeGuardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], HomeGuardService);

let LoginGuardService = class LoginGuardService {
    constructor(_router, authService) {
        this._router = _router;
        this.authService = authService;
    }
    canActivate(route, state) {
        if (this.authService.isLoggedIn) {
            this._router.navigate(['home']);
            return false;
        }
        return true;
    }
};
LoginGuardService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
];
LoginGuardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LoginGuardService);



/***/ }),

/***/ "fFVb":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit/edit.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n    <ion-toolbar>\r\n        <ion-buttons slot=\"start\">\r\n            <ion-back-button defaultHref=\"cooler\"></ion-back-button>\r\n        </ion-buttons>\r\n        <ion-title>\r\n            <div>\r\n                <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\r\n                <label>Con</label>\r\n            </div>\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n    <ion-card style=\"height: 97%;overflow-y: scroll;\">\r\n        <ion-card-content>\r\n            <ion-row>\r\n                <ion-col>\r\n                    <div style=\"text-align: center;padding-top: 30px;padding-bottom: 10px;\"><img\r\n                            src=\"../assets/icon/lg.png\" style=\"width: 60px;\">\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n                <ion-col>\r\n                    <div style=\"text-align: center;\">\r\n                        {{UserEmail}}\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>\r\n            <br>\r\n            <ion-item lines=\"full\">\r\n                <ion-label position=\"floating\">Device Name</ion-label>\r\n                <ion-input type=\"text\" name=\"DeviceName\" [(ngModel)]=\"DeviceName\" required></ion-input>\r\n            </ion-item><br>\r\n            <div style=\"text-align: center;\">\r\n                <ion-button (click)=\"UpdateButtonClicked()\" color=\"primary\">Update</ion-button><br><br><br><br><br><br>\r\n                <ion-button color=\"danger\" (click)=\"DeleteButtonClicked()\">Delete Device</ion-button>\r\n            </div>\r\n        </ion-card-content>\r\n    </ion-card>\r\n</ion-content>");

/***/ }),

/***/ "gGsJ":
/*!*******************************************!*\
  !*** ./src/app/setup/setup.component.css ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXR1cC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "in5m":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\r\n    <ion-toolbar>\r\n        <ion-title>\r\n            <div>\r\n                <img src=\"../assets/icon/home.png\" alt=\"logo-image\" style=\"width: 40px;\">\r\n                <label>Con</label>\r\n            </div>\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n    <ion-card style=\"height:97%\">\r\n        <ion-card-content>\r\n            <div style=\"text-align: center;padding-top: 50px;padding-bottom: 50px;\"><img src=\"../assets/icon/lg.png\"\r\n                    style=\"width: 80px;\">\r\n            </div>\r\n            <form #form=\"ngForm\">\r\n                <ion-item lines=\"full\">\r\n                    <ion-label position=\"floating\">Email</ion-label>\r\n                    <ion-input #txtEmail type=\"email\"\r\n                        pattern=\"[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})\"\r\n                        name=\"Email\" [(ngModel)]=\"Email\" required></ion-input>\r\n                </ion-item>\r\n                <ion-item lines=\"full\" *ngIf=\"IsPasswordTextBoxVisible\">\r\n                    <ion-label position=\"floating\">Password</ion-label>\r\n                    <ion-input type=\"password\" minlength=\"6\" name=\"Password\" #txtPassword [(ngModel)]=\"Password\"\r\n                        required></ion-input>\r\n                </ion-item>\r\n                <ion-row>\r\n                    <ion-col><br>\r\n                        <div *ngIf=\"IsForgotPasswordVisible\" style=\"text-align: right;\">\r\n                            <a class=\"small-text\" (click)=\"ForgotPasswordClicked()\">Forgot Password?</a></div><br>\r\n                        <ion-button expand=\"block\" (click)=\"ProceedClicked()\" *ngIf=\"IsProceedButtonVisible\"\r\n                            color=\"primary\">Proceed</ion-button>\r\n                        <ion-button color=\"danger\" expand=\"block\" (click)=\"SignInClicked()\"\r\n                            *ngIf=\"IsSignInButtonVisible\">Sign In</ion-button><br>\r\n                        <ion-button (click)=\"RegisterClicked()\" expand=\"block\" *ngIf=\"IsRegisterButtonVisible\"\r\n                            color=\"primary\">Register</ion-button>\r\n                    </ion-col>\r\n                </ion-row>\r\n                <ion-row>\r\n                    <ion-col>\r\n                        <div style=\"text-align: center;\">\r\n                        <a (click)=\"ContinueWithoutLoginClicked()\">Continue without login >></a>\r\n                    </div>\r\n                    </ion-col>\r\n                </ion-row>\r\n\r\n            </form>\r\n        </ion-card-content>\r\n    </ion-card>\r\n</ion-content>");

/***/ }),

/***/ "kLfG":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ion-action-sheet.entry.js": [
		"dUtr",
		"common",
		0
	],
	"./ion-alert.entry.js": [
		"Q8AI",
		"common",
		1
	],
	"./ion-app_8.entry.js": [
		"hgI1",
		"common",
		2
	],
	"./ion-avatar_3.entry.js": [
		"CfoV",
		"common",
		3
	],
	"./ion-back-button.entry.js": [
		"Nt02",
		"common",
		4
	],
	"./ion-backdrop.entry.js": [
		"Q2Bp",
		5
	],
	"./ion-button_2.entry.js": [
		"0Pbj",
		"common",
		6
	],
	"./ion-card_5.entry.js": [
		"ydQj",
		"common",
		7
	],
	"./ion-checkbox.entry.js": [
		"4fMi",
		"common",
		8
	],
	"./ion-chip.entry.js": [
		"czK9",
		"common",
		9
	],
	"./ion-col_3.entry.js": [
		"/CAe",
		10
	],
	"./ion-datetime_3.entry.js": [
		"WgF3",
		"common",
		11
	],
	"./ion-fab_3.entry.js": [
		"uQcF",
		"common",
		12
	],
	"./ion-img.entry.js": [
		"wHD8",
		13
	],
	"./ion-infinite-scroll_2.entry.js": [
		"2lz6",
		14
	],
	"./ion-input.entry.js": [
		"ercB",
		"common",
		15
	],
	"./ion-item-option_3.entry.js": [
		"MGMP",
		"common",
		16
	],
	"./ion-item_8.entry.js": [
		"9bur",
		"common",
		17
	],
	"./ion-loading.entry.js": [
		"cABk",
		"common",
		18
	],
	"./ion-menu_3.entry.js": [
		"kyFE",
		"common",
		19
	],
	"./ion-modal.entry.js": [
		"TvZU",
		"common",
		20
	],
	"./ion-nav_2.entry.js": [
		"vnES",
		"common",
		21
	],
	"./ion-popover.entry.js": [
		"qCuA",
		"common",
		22
	],
	"./ion-progress-bar.entry.js": [
		"0tOe",
		"common",
		23
	],
	"./ion-radio_2.entry.js": [
		"h11V",
		"common",
		24
	],
	"./ion-range.entry.js": [
		"XGij",
		"common",
		25
	],
	"./ion-refresher_2.entry.js": [
		"nYbb",
		"common",
		26
	],
	"./ion-reorder_2.entry.js": [
		"smMY",
		"common",
		27
	],
	"./ion-ripple-effect.entry.js": [
		"STjf",
		28
	],
	"./ion-route_4.entry.js": [
		"k5eQ",
		"common",
		29
	],
	"./ion-searchbar.entry.js": [
		"OR5t",
		"common",
		30
	],
	"./ion-segment_2.entry.js": [
		"fSgp",
		"common",
		31
	],
	"./ion-select_3.entry.js": [
		"lfGF",
		"common",
		32
	],
	"./ion-slide_2.entry.js": [
		"5xYT",
		33
	],
	"./ion-spinner.entry.js": [
		"nI0H",
		"common",
		34
	],
	"./ion-split-pane.entry.js": [
		"NAQR",
		35
	],
	"./ion-tab-bar_2.entry.js": [
		"knkW",
		"common",
		36
	],
	"./ion-tab_2.entry.js": [
		"TpdJ",
		"common",
		37
	],
	"./ion-text.entry.js": [
		"ISmu",
		"common",
		38
	],
	"./ion-textarea.entry.js": [
		"U7LX",
		"common",
		39
	],
	"./ion-toast.entry.js": [
		"L3sA",
		"common",
		40
	],
	"./ion-toggle.entry.js": [
		"IUOf",
		"common",
		41
	],
	"./ion-virtual-scroll.entry.js": [
		"8Mb5",
		42
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "kLfG";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "lGQG":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");





let AuthService = class AuthService {
    constructor(afStore, ngFireAuth, router) {
        this.afStore = afStore;
        this.ngFireAuth = ngFireAuth;
        this.router = router;
    }
    ValidateEmail(email) {
        return this.ngFireAuth.fetchSignInMethodsForEmail(email);
    }
    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }
    RegisterUser(email, password) {
        return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    }
    PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
    }
    get isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false;
    }
    SignOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }
};
AuthService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthService);



/***/ }),

/***/ "mzxq":
/*!*********************************************!*\
  !*** ./src/app/services/loading.Service.ts ***!
  \*********************************************/
/*! exports provided: LoadingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingService", function() { return LoadingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "TEn/");



let LoadingService = class LoadingService {
    constructor(loadingController) {
        this.loadingController = loadingController;
        this.isLoading = false;
        this.loaders = new Array();
    }
    present() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.dismiss();
            this.loader = this.loadingController.create({
                backdropDismiss: true
            });
            this.loader.then(p => {
                p.present();
            });
        });
    }
    dismiss() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.loader) {
                this.loader.then(p => {
                    p.dismiss();
                });
            }
        });
    }
};
LoadingService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] }
];
LoadingService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LoadingService);



/***/ }),

/***/ "n7sk":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n.divider {\r\n    display: flex;\r\n  }\r\n  \r\n  .line {\r\n    align-items: center;\r\n    margin: 1em -1em;\r\n    color: #cccccc;\r\n  }\r\n  \r\n  .auth-form ion-grid,\r\n  .auth-form ion-row {\r\n    height: 100%;\r\n    justify-content: center;\r\n  }\r\n  \r\n  .already {\r\n    display: block;\r\n    text-align: center;\r\n    padding-bottom: 10px;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksYUFBYTtFQUNmOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixjQUFjO0VBQ2hCOztFQUVBOztJQUVFLFlBQVk7SUFDWix1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSxjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLG9CQUFvQjtFQUN0QiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5kaXZpZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG4gIFxyXG4gIC5saW5lIHtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDFlbSAtMWVtO1xyXG4gICAgY29sb3I6ICNjY2NjY2M7XHJcbiAgfSBcclxuICBcclxuICAuYXV0aC1mb3JtIGlvbi1ncmlkLFxyXG4gIC5hdXRoLWZvcm0gaW9uLXJvdyB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLmFscmVhZHkge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICB9Il19 */");

/***/ }),

/***/ "tq2C":
/*!********************************************!*\
  !*** ./src/app/search/search.component.ts ***!
  \********************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_search_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./search.component.html */ "I/Hr");
/* harmony import */ var _search_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search.component.css */ "WuAh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app.service */ "F5nt");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/wifi-wizard-2/ngx */ "ASgJ");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");









let SearchComponent = class SearchComponent {
    constructor(_router, _appService, _toastController, _wifiWizard2, alertController, _loading, _activedRoute) {
        this._router = _router;
        this._appService = _appService;
        this._toastController = _toastController;
        this._wifiWizard2 = _wifiWizard2;
        this.alertController = alertController;
        this._loading = _loading;
        this._activedRoute = _activedRoute;
        this.Networklist = [];
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
    presentToast(msg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this._toastController.create({
                message: msg,
                duration: 4000
            });
            toast.present();
        });
    }
};
SearchComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"] },
    { type: _ionic_native_wifi_wizard_2_ngx__WEBPACK_IMPORTED_MODULE_7__["WifiWizard2"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
];
SearchComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_search_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_search_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SearchComponent);



/***/ }),

/***/ "uMz8":
/*!******************************************!*\
  !*** ./src/app/setup/setup.component.ts ***!
  \******************************************/
/*! exports provided: SetupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupComponent", function() { return SetupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_setup_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./setup.component.html */ "UEwX");
/* harmony import */ var _setup_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup.component.css */ "gGsJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../app.service */ "F5nt");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "tk/3");









let SetupComponent = class SetupComponent {
    constructor(_router, _toastController, _loading, alertController, _appService, _http) {
        this._router = _router;
        this._toastController = _toastController;
        this._loading = _loading;
        this.alertController = alertController;
        this._appService = _appService;
        this._http = _http;
        this.IsLoggedIn = false;
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
        this.IsLoggedIn = JSON.parse(window.localStorage.getItem('user')).email != 'Guest';
    }
    presentToast(msg) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this._toastController.create({
                message: msg,
                duration: 4000
            });
            toast.present();
        });
    }
    DirectConnectButtonClicked() {
        this.presentAlertPrompt();
    }
    RouterConnectButtonClicked() {
        this._router.navigate(['networks']);
    }
    presentAlertPrompt() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
                    },
                    {
                        text: 'Connect',
                        handler: (data) => {
                            this._loading.present();
                            var IsOn = false;
                            var rangevalue = 1;
                            var iswateron = false;
                            var isswingon = false;
                            var url = 'http://' + this.dIP + '/GetStatus';
                            this._http.get(url).subscribe((response) => {
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
            yield alert.present();
        });
    }
};
SetupComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _app_service__WEBPACK_IMPORTED_MODULE_7__["AppService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }
];
SetupComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_setup_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_setup_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SetupComponent);



/***/ }),

/***/ "uPFI":
/*!*****************************************!*\
  !*** ./src/app/edit/edit.component.css ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _cooler_cooler_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cooler/cooler.component */ "Ehvd");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search/search.component */ "tq2C");
/* harmony import */ var _setup_setup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup/setup.component */ "uMz8");
/* harmony import */ var _networks_networks_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./networks/networks.component */ "0IeV");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _services_authGuard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/authGuard.service */ "f67T");
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./edit/edit.component */ "MYgn");










const routes = [
    {
        path: 'home',
        loadChildren: () => __webpack_require__.e(/*! import() | home-home-module */ "home-home-module").then(__webpack_require__.bind(null, /*! ./home/home.module */ "ct+p")).then(m => m.HomePageModule),
        canActivate: [_services_authGuard_service__WEBPACK_IMPORTED_MODULE_8__["HomeGuardService"]]
    },
    {
        path: 'search',
        component: _search_search_component__WEBPACK_IMPORTED_MODULE_4__["SearchComponent"],
    },
    {
        path: 'setup',
        component: _setup_setup_component__WEBPACK_IMPORTED_MODULE_5__["SetupComponent"],
    },
    {
        path: 'networks',
        component: _networks_networks_component__WEBPACK_IMPORTED_MODULE_6__["NetworksComponent"],
    },
    {
        path: 'cooler',
        component: _cooler_cooler_component__WEBPACK_IMPORTED_MODULE_3__["CoolerComponent"],
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
        canActivate: [_services_authGuard_service__WEBPACK_IMPORTED_MODULE_8__["LoginGuardService"]]
    },
    {
        path: 'edit',
        component: _edit_edit_component__WEBPACK_IMPORTED_MODULE_9__["EditComponent"]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__["PreloadAllModules"] })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "vtpD":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./login.component.html */ "in5m");
/* harmony import */ var _login_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component.css */ "n7sk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "lGQG");
/* harmony import */ var _services_loading_Service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/loading.Service */ "mzxq");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../app.service */ "F5nt");










let LoginComponent = class LoginComponent {
    constructor(authService, _loading, _toastController, _router, firebase, _appService) {
        this.authService = authService;
        this._loading = _loading;
        this._toastController = _toastController;
        this._router = _router;
        this.firebase = firebase;
        this._appService = _appService;
        this.IsPasswordTextBoxVisible = false;
        this.IsProceedButtonVisible = true;
        this.IsSignInButtonVisible = false;
        this.IsRegisterButtonVisible = false;
        this.IsForgotPasswordVisible = false;
    }
    ProceedClicked() {
        var curObj = this;
        if (this.form.valid) {
            this._loading.present();
            this.authService.ValidateEmail(this.Email).then(function (res) {
                if (res.length > 0) {
                    curObj.IsSignInButtonVisible = true;
                    curObj.IsRegisterButtonVisible = false;
                }
                else {
                    curObj.IsRegisterButtonVisible = true;
                    curObj.IsSignInButtonVisible = false;
                }
                curObj.IsPasswordTextBoxVisible = true;
                curObj.IsProceedButtonVisible = false;
                curObj._loading.dismiss();
                setTimeout(() => {
                    curObj.txtPassword.setFocus();
                }, 100);
            }, function (res) {
                curObj._loading.dismiss();
                curObj.presentToast('Something went wrong. Please try after sometime.');
            });
        }
        else {
            setTimeout(() => {
                curObj.txtEmail.setFocus();
            }, 100);
        }
    }
    SignInClicked() {
        var curObj = this;
        if (this.form.valid) {
            this._loading.present();
            this.authService.SignIn(this.Email, this.Password).then(function (res) {
                window.localStorage.setItem('user', JSON.stringify({ 'uid': res.user.uid, 'email': res.user.email }));
                curObj._loading.dismiss();
                window.localStorage.removeItem('Devices');
                curObj._appService.Devices = [];
                curObj._router.navigate(['home']);
            }, function (res) {
                curObj._loading.dismiss();
                if (res.code == 'auth/wrong-password') {
                    curObj.IsForgotPasswordVisible = true;
                    curObj.Password = '';
                    curObj.presentToast('Invalid Email or Password.');
                    setTimeout(() => {
                        curObj.txtPassword.setFocus();
                    }, 500);
                }
                else if (res.code = 'auth/too-many-requests') {
                    curObj.Password = '';
                    curObj.presentToast('Account is disabled. Please try after sometime.');
                }
                else {
                    curObj.Password = '';
                    curObj.presentToast('Something went wrong. Please try after sometime.');
                }
            });
        }
        else {
            setTimeout(() => {
                curObj.txtPassword.setFocus();
            }, 100);
        }
    }
    RegisterClicked() {
        var curObj = this;
        if (this.form.valid) {
            this._loading.present();
            this.authService.RegisterUser(this.Email, this.Password).then(function (res) {
                window.localStorage.setItem('user', JSON.stringify({ 'uid': res.user.uid, 'email': res.user.email }));
                curObj._loading.dismiss();
                window.localStorage.removeItem('Devices');
                curObj._appService.Devices = [];
                curObj._router.navigate(['home']);
            }, function (res) {
                curObj._loading.dismiss();
                curObj.presentToast('Something went wrong. Please try after sometime.');
            });
        }
        else {
            setTimeout(() => {
                curObj.txtPassword.setFocus();
            }, 100);
        }
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
    ContinueWithoutLoginClicked() {
        window.localStorage.setItem('user', JSON.stringify({ 'uid': '', 'email': 'Guest' }));
        this._router.navigate(['home']);
    }
    ionViewWillLeave() {
        this.IsPasswordTextBoxVisible = false;
        this.IsProceedButtonVisible = true;
        this.IsSignInButtonVisible = false;
        this.IsRegisterButtonVisible = false;
        this.IsForgotPasswordVisible = false;
        this.form.reset();
    }
    ForgotPasswordClicked() {
        var curObj = this;
        this.IsPasswordTextBoxVisible = false;
        setTimeout(() => {
            if (this.form.valid) {
                curObj._loading.present();
                curObj.authService.PasswordRecover(this.Email).then(function (res) {
                    curObj.IsPasswordTextBoxVisible = true;
                    curObj._loading.dismiss();
                    curObj.Password = '';
                    curObj.presentToast('Password reset email has been sent, please check your inbox.');
                    setTimeout(() => {
                        curObj.txtPassword.setFocus();
                    }, 500);
                }, function () {
                    curObj._loading.dismiss();
                    curObj.presentToast('Connection error.');
                });
            }
            else {
                curObj.presentToast('Email is required.');
                setTimeout(() => {
                    curObj.txtEmail.setFocus();
                }, 500);
            }
        }, 100);
    }
};
LoginComponent.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _services_loading_Service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: _angular_fire__WEBPACK_IMPORTED_MODULE_8__["FirebaseApp"] },
    { type: _app_service__WEBPACK_IMPORTED_MODULE_9__["AppService"] }
];
LoginComponent.propDecorators = {
    txtPassword: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['txtPassword',] }],
    txtEmail: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['txtEmail',] }],
    form: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['form',] }]
};
LoginComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        template: _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_login_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], LoginComponent);



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.log(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map