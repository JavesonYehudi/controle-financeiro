import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { FinancialTransaction } from './financial-transaction';
import { Payment } from './payment';


@Injectable()
export class IncomeService {
  private financialTransactionUrl = 'http://localhost:8080/controle-financeiro-ws/income';  // URL to web api

  constructor(private http: Http) {}

  getFinancialTransactions(): Promise<FinancialTransaction[]> {
    return this.http.get(this.financialTransactionUrl + '/list')
              .toPromise()
              .then(mapFinancialTransaction);
  }

  getFinancialTransaction(id: number): Promise<FinancialTransaction> {
    return this.http.get(this.financialTransactionUrl + '/find/' + id)
            .toPromise()
            .then(response => response.json() as FinancialTransaction);
  }

  setFinancialTransaction(financialTransaction: FinancialTransaction): Promise<FinancialTransaction>{
    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.financialTransactionUrl + '/create',
      body: JSON.stringify(financialTransaction)
    });
    return this.http.request(new Request(requestoptions)).toPromise().then(response => response.json() as FinancialTransaction)
  }

  updateFinancialTransaction(financialTransaction: FinancialTransaction): Promise<FinancialTransaction>{
    let body = JSON.stringify(financialTransaction);
    return this.http.put(`${this.financialTransactionUrl}/update/${financialTransaction.id}` , body)
      .toPromise().then(response => response.json() as FinancialTransaction);
  }

  deleteFinancialTransaction(id:number): Promise<FinancialTransaction>{
    return this.http.delete(`${this.financialTransactionUrl}/delete/${id}`)
      .toPromise().then(response => response.json());
  }

  pay(payment: Payment, transaction: FinancialTransaction): Promise<FinancialTransaction>{
    let body = JSON.stringify(payment);
    return this.http.put(`${this.financialTransactionUrl}/pay/${transaction.id}`, body)
      .toPromise().then(response => response.json() as FinancialTransaction);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

function mapFinancialTransaction(response:Response): FinancialTransaction[]{
  // The response of the API has a results
  // property with the actual results
  return response.json();
}