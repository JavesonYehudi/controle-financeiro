import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';


@Injectable()
export class AuthService {
  private userUrl = 'http://localhost:8080/controle-financeiro-ws/user';  // URL to 
  constructor(private http: Http) {}

  validateUser(user:User): void{
    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.userUrl + '/log-in',
      body: JSON.stringify(user)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => localStorage.setItem('token', response.json()));
  }

}