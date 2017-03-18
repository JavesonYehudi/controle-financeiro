import {Funds} from './funds';
import {Maturity} from './maturity';
import {Payment} from './payment';
import {EFinancialTransactionType} from './e-financial-transaction-type';

export class FinancialTransaction {
	id: number;
	description: string;
	valueTransaction: number;
	maturityList: Array<Maturity>;
	payments: Array<Payment>;
	firstMaturity: string;
	funds = new Funds();
	fixedTransaction: boolean;
	recurrent: number;
	calendarPeriod: number;
	group: string;
	financialTransactionType: EFinancialTransactionType;
}