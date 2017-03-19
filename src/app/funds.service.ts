import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, Request, RequestMethod } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Funds } from './funds';


@Injectable()
export class FundsService {
  private fundsesUrl = 'http://localhost:8080/controle-financeiro-ws/funds';  // URL to web api

  constructor(private http: Http) {}

  getFundses(): Promise<Funds[]> {
    return this.http.get(this.fundsesUrl + '/list')
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
      body: JSON.stringify(funds)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => response.json() as Funds).catch(this.handleError);
  }

  updateFunds(funds: Funds): Promise<Funds>{
    let body = JSON.stringify(funds);
    return this.http.put(`${this.fundsesUrl}/update/${funds.id}` , body)
      .toPromise().then(response => response.json() as Funds);
  }

  deleteFunds(id:number): Promise<Funds>{
    return this.http.delete(`${this.fundsesUrl}/delete/${id}`)
      .toPromise().then(response => response.json());
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