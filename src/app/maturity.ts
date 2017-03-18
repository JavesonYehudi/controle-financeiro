import {Payment} from './payment';
import {FinancialTransaction} from './financial-transaction';

export class Maturity {
	id: number;
	value: number;
	date: string;
	payment: Payment;
	paid: Boolean;
	financialTransaction: FinancialTransaction;
}