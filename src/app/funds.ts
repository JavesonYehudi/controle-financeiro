import {EFundsType} from './e-funds-type';
import {User} from './user'

export class Funds {
	id: number;
	description: string;
	fundsType: EFundsType;
	user = new User();
}