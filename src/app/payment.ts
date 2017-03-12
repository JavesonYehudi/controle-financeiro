import {Maturity} from './maturity';

export class Payment {
	id: number;
	valuePaid: number;
	datePayment: string;
	maturity: Maturity;

}