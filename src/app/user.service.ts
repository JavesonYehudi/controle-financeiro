import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private url: string = 'http://localhost:8080/controle-financeiro-ws/user/log-in';

  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loggedIn: Observable<boolean> = this._loggedIn.asObservable();

  constructor(private http: Http) { }

  autentica(usuario: User) {
    return this.http
               .post(this.url, JSON.stringify(usuario))
               .map((res) => {                     
                  var token = res.json();
                  if (token) {
                      this._loggedIn.next(true);
                      localStorage.setItem('token', token.token);
                  }
               });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');

    if(token){ //essa atribuição é feita para atualizar a variavel e o resto do sistema ser notificado
      this._loggedIn.next(true);
    } else {
      this._loggedIn.next(false);
    }

    return this._loggedIn.getValue();
  }

}