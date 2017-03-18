import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { BankAccount } from './bank-account';


@Injectable()
export class BankAccountService {
  private bankAccountUrl = 'http://localhost:8080/controle-financeiro-ws/bank-account';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});  

  constructor(private http: Http) {
this.headers.append('Authorization','eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImphdmVzb24iLCJwYXNzIjoiMTIzIiwianRpIjoiOTU0MmQwNWU4NTliNGIxZGEyNjQwYTJlMzgxY2Y4ZWMiLCJpYXQiOjE0ODg4MDQ0ODJ9.3lheLIHSECUe1lNLN4O0sg1n8J0VOey6IA38mh9cxUQ'); // ... Set content 
  }

  getBankAccounts(): Promise<BankAccount[]> {
    return this.http.get(this.bankAccountUrl + '/list', {headers: this.headers})
              .toPromise()
              .then(mapBankAccount);
  }

  getBankAccount(id: number): Promise<BankAccount> {
    return this.http.get(this.bankAccountUrl + '/find/' + id, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as BankAccount);
  }

  setBankAccount(bankAccount: BankAccount): Promise<BankAccount>{
    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.bankAccountUrl + '/create',
      headers: this.headers,
      body: JSON.stringify(bankAccount)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => response.json() as BankAccount)
  }

  updateBankAccount(bankAccount: BankAccount): Promise<BankAccount>{
    var requestoptions = new RequestOptions({headers: this.headers});
    let body = JSON.stringify(bankAccount);
    return this.http.put(`${this.bankAccountUrl}/update/${bankAccount.id}` , body, requestoptions)
      .toPromise().then(response => response.json() as BankAccount);
  }

  deleteBankAccount(id:number): Promise<BankAccount>{
    var requestoptions = new RequestOptions({headers: this.headers});
    return this.http.delete(`${this.bankAccountUrl}/delete/${id}`, requestoptions)
      .toPromise().then(response => response.json());
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