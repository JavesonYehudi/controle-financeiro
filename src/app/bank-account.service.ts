import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { BankAccount } from './bank-account';


@Injectable()
export class BankAccountService {
  private bankAccountsUrl = 'http://10.3.2.136:8080/controle-financeiro-ws/bank-account';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});  

  constructor(private http: Http) {
this.headers.append('Authorization','eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImphdmVzb24iLCJwYXNzIjoiMTIzIiwianRpIjoiOTU0MmQwNWU4NTliNGIxZGEyNjQwYTJlMzgxY2Y4ZWMiLCJpYXQiOjE0ODg4MDQ0ODJ9.3lheLIHSECUe1lNLN4O0sg1n8J0VOey6IA38mh9cxUQ'); // ... Set content 
  }

  getBankAccounts(): Promise<BankAccount[]> {
    return this.http.get(this.bankAccountsUrl + '/list', {headers: this.headers})
              .toPromise()
              .then(mapBankAccount);
  }

  getBankAccount(id: number): Promise<BankAccount> {
    return this.http.get(this.bankAccountsUrl + '/find/' + id, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as BankAccount);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

function mapBankAccount(response:Response): BankAccount[]{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}