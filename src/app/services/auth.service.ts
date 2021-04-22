import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    userData: any;

    constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router
    ) {

    }

    ValidateEmail(email){
        return this.ngFireAuth.fetchSignInMethodsForEmail(email);
    }

    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    }

    RegisterUser(email, password) {
        return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
    }

    PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
    }

    get isLoggedIn(): boolean {
        const user =JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false;
    }

    SignOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        })
    }

}