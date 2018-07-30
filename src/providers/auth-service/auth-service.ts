import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

export class User {
  name: string;
  username: string;
  id: string;
 
  constructor(name: string, username: string, id: string) {
    this.name = name;
    this.username = username;
    this.id = id;
  }
}

@Injectable()
export class AuthServiceProvider {

    currentUser: User;

    constructor(private http: Http) {
        console.log('Hello AuthServiceProvider Provider');
    }
  
    public login(credentials) {
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                
                this.http.get('http://35.168.88.201/clinic/api/user/login.php?username='+credentials.username+'&password='+credentials.password)
                .subscribe(data => {
                    console.log( data._body );
                    
                    if( data._body != '[]'){
                        var user_post = JSON.parse(data._body );
                        this.currentUser = new User(user_post.name, user_post.username, user_post.id);

                        let access = true;

                        observer.next(access);
                        observer.complete();
                    }else{
                        let access = false;
                    }
                    
                    observer.next(access);
                    observer.complete();
                });
                
                
            });
        }
    }
  
    public getUserInfo() : User {
        return this.currentUser;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }

}
