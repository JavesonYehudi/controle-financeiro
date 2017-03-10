import { Component, OnInit } from '@angular/core';

import { Funds }	from './funds';
import { BankAccount }	from './bank-account';
import { CreditCard }	from './credit-card';
import { EFundsType }	from './e-funds-type';
import { FundsService } from './funds.service';

import {Router} from '@angular/router';

@Component({
  selector: 'create-funds',
  templateUrl: './create-funds.component.html',
  styleUrls: ['./create-funds.component.css'],
  providers: []
})

export class CreateFundsComponent implements OnInit {
	funds = new Funds();
	creditCard = new CreditCard();
	bankAccount = new BankAccount();
	submitted = false;
	fundsTypes = EFundsType;
	fundsTypeSeleceted: EFundsType;
	options : Array<string>;

	constructor(
		private router: Router,
		private fundsService: FundsService) { }

	ngOnInit(): void {
		this.options = ['DEFAULT', 'BANK_ACCOUNT', 'CREDIT_CARD'];
	}

	onFundsSeleceted(fundsType: string): void {
		this.fundsTypeSeleceted = this.fundsTypes[fundsType];
	}

	onSubmit(){
		this.submitted = true;
		if(this.fundsTypeSeleceted == this.fundsTypes['BANK_ACCOUNT']){
			this.bankAccount.user.id = 834418;
			this.bankAccount.description = this.funds.description;
			this.bankAccount.fundsType = this.funds.fundsType;
		}

		if(this.fundsTypeSeleceted == this.fundsTypes['CREDIT_CARD']){
			this.creditCard.user.id = 834418;
			this.creditCard.description = this.funds.description;
			this.creditCard.fundsType = this.funds.fundsType;
		}
		if(this.fundsTypeSeleceted == this.fundsTypes['DEFAULT']){
			this.funds.user.id = 834418;
		}
		this.fundsService.setFunds(this.funds);
	}

}