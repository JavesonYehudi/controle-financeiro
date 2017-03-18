import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { CreditCard } from './credit-card';


@Injectable()
export class CreditCardService {
  private creditCardUrl = 'http://localhost:8080/controle-financeiro-ws/credit-card';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});  

  constructor(private http: Http) {
this.headers.append('Authorization','eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImphdmVzb24iLCJwYXNzIjoiMTIzIiwianRpIjoiOTU0MmQwNWU4NTliNGIxZGEyNjQwYTJlMzgxY2Y4ZWMiLCJpYXQiOjE0ODg4MDQ0ODJ9.3lheLIHSECUe1lNLN4O0sg1n8J0VOey6IA38mh9cxUQ'); // ... Set content 
  }

  getCreditCards(): Promise<CreditCard[]> {
    return this.http.get(this.creditCardUrl + '/list', {headers: this.headers})
              .toPromise()
              .then(mapBankAccount);
  }

  getCreditCard(id: number): Promise<CreditCard> {
    return this.http.get(this.creditCardUrl + '/find/' + id, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as CreditCard);
  }

  setCreditCard(creditCard: CreditCard): Promise<CreditCard>{
    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.creditCardUrl + '/create',
      headers: this.headers,
      body: JSON.stringify(creditCard)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => response.json() as CreditCard)
  }

  updateCreditCard(creditCard: CreditCard): Promise<CreditCard>{
    var requestoptions = new RequestOptions({headers: this.headers});
    let body = JSON.stringify(creditCard);
    return this.http.put(`${this.creditCardUrl}/update/${creditCard.id}` , body, requestoptions)
      .toPromise().then(response => response.json() as CreditCard);
  }

  deleteCreditCard(id:number): Promise<CreditCard>{
    var requestoptions = new RequestOptions({headers: this.headers});
    return this.http.delete(`${this.creditCardUrl}/delete/${id}`, requestoptions)
      .toPromise().then(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

function mapBankAccount(response:Response): CreditCard[]{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}