import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Financialtransaction } from './financial-transaction';


@Injectable()
export class ExpenseService {
  private FinancialtransactionUrl = 'http://localhost:8080/controle-financeiro-ws/expense';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});  

  constructor(private http: Http) {
this.headers.append('Authorization','eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImphdmVzb24iLCJwYXNzIjoiMTIzIiwianRpIjoiOTU0MmQwNWU4NTliNGIxZGEyNjQwYTJlMzgxY2Y4ZWMiLCJpYXQiOjE0ODg4MDQ0ODJ9.3lheLIHSECUe1lNLN4O0sg1n8J0VOey6IA38mh9cxUQ'); // ... Set content 
  }

  getFinancialtransactions(): Promise<Financialtransaction[]> {
    return this.http.get(this.FinancialtransactionUrl + '/list', {headers: this.headers})
              .toPromise()
              .then(mapFinancialtransaction);
  }

  getFinancialtransaction(id: number): Promise<Financialtransaction> {
    return this.http.get(this.FinancialtransactionUrl + '/find/' + id, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Financialtransaction);
  }

  setFinancialtransaction(Financialtransaction: Financialtransaction): Promise<Financialtransaction>{
    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.FinancialtransactionUrl + '/create',
      headers: this.headers,
      body: JSON.stringify(Financialtransaction)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => response.json() as Financialtransaction)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

function mapFinancialtransaction(response:Response): Financialtransaction[]{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}