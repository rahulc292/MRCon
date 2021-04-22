import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.Service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';
import { AppService } from '../app.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    IsPasswordTextBoxVisible: boolean = false;
    IsProceedButtonVisible: boolean = true;
    IsSignInButtonVisible: boolean = false;
    IsRegisterButtonVisible: boolean = false;
    IsForgotPasswordVisible: boolean = false;

    Email: string;
    Password: string;

    @ViewChild('txtPassword') txtPassword: { setFocus: () => void; };
    @ViewChild('txtEmail') txtEmail: { setFocus: () => void; };
    @ViewChild('form') form: NgForm;

    constructor(private authService: AuthService, private _loading: LoadingService,
        private _toastController: ToastController, private _router: Router,
        private firebase: FirebaseApp, private _appService: AppService) {

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

    async presentToast(msg) {
        const toast = await this._toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
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
}