import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, Loading, IonicPage, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loading: Loading;
    registerCredentials = { username: '', password: '' };

    constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    }

    public login() {
        this.showLoading()
        this.auth.login(this.registerCredentials).subscribe(allowed => {
            if (allowed) {        
                this.nav.setRoot(HomePage);
            } else {
                this.showError("Invalido usuario o contraseña");
            }
        },
        error => {
          this.showError(error);
        });
    }
    
    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
    
    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

}
