import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, Request, RequestMethod } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Funds } from './funds';


@Injectable()
export class FundsService {
  private fundsesUrl = 'http://10.3.2.136:8080/controle-financeiro-ws/funds';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});  

  constructor(private http: Http) {
this.headers.append('Authorization','eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImphdmVzb24iLCJwYXNzIjoiMTIzIiwianRpIjoiOTU0MmQwNWU4NTliNGIxZGEyNjQwYTJlMzgxY2Y4ZWMiLCJpYXQiOjE0ODg4MDQ0ODJ9.3lheLIHSECUe1lNLN4O0sg1n8J0VOey6IA38mh9cxUQ'); // ... Set content 
  }

  getFundses(): Promise<Funds[]> {
    return this.http.get(this.fundsesUrl + '/list', {headers: this.headers})
              .toPromise()
              .then(mapFunds);
  }

  getFunds(id: number): Promise<Funds> {
    return this.getFundses()
             .then(fundses => fundses.find(funds => funds.id === id));
  }

  setFunds(funds: Funds): Promise<Funds>{
    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.fundsesUrl + '/create',
      headers: this.headers,
      body: JSON.stringify(funds)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => response.json() as Funds)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

function mapFunds(response:Response): Funds[]{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}