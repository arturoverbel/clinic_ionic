import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, Loading, IonicPage, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    username = '';
    name = '';
    listTypes = [];
    
    accidentForm: FormGroup;
    
    constructor(public nav: NavController, private auth: AuthServiceProvider, private formBuilder: FormBuilder, private http: Http) {
        let info = this.auth.getUserInfo();
        
        this.name = info['name'];
        this.username = info['username'];
        
        this.accidentForm = this.formBuilder.group({
            id_type_accident: [''],
            id_user: info['id'],
            observations: ['']
        });
        
        this.http.get('http://35.168.88.201/clinic/api/type_accident/index.php')
        .subscribe(data => {
            console.log( data.json() );
            this.listTypes = data.json();
            console.log( this.listTypes); 
        });
        
    }
    
    
    public register() {
        console.log(this.accidentForm.value);
        var values = this.accidentForm.value;
        
        this.http.get('http://35.168.88.201/clinic/api/accident/create.php?id_type_accident='+values.id_type_accident+'&id_user='+values.id_user+'&observations='+values.observations)
        .subscribe(data => {
            var response = JSON.parse( data.json() );
            console.log( data.json() );
            if( response ){
                if(confirm("Registrado exitosamente.")) {
                    this.nav.push(HomePage);
                }else{
                    this.nav.push(HomePage);
                }
            }else{
                alert('No se pudo registrar');
            }

        });
        
    }
    
    public logout() {
        this.auth.logout().subscribe(succ => {
            this.nav.setRoot(LoginPage);
        });
    }
}
