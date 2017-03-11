import { Component, OnInit } from '@angular/core';

import { Funds }	from './funds';
import { BankAccount }	from './bank-account';
import { CreditCard }	from './credit-card';
import { EFundsType }	from './e-funds-type';
import { FundsService } from './funds.service';
import { BankAccountService } from './bank-account.service';
import { CreditCardService } from './credit-card.service';

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
		private fundsService: FundsService,
		private bankAccountService: BankAccountService,
		private creditCardService: CreditCardService) { }

	ngOnInit(): void {
		this.options = ['DEFAULT', 'BANK_ACCOUNT', 'CREDIT_CARD'];
	}

	onFundsSeleceted(fundsType: string): void {
		this.fundsTypeSeleceted = this.fundsTypes[fundsType];
	}

	onSubmit(){
		this.submitted = true;
		console.log(this.fundsTypeSeleceted);
		if(this.fundsTypeSeleceted == this.fundsTypes['BANK_ACCOUNT']){
			this.bankAccount.description = this.funds.description;
			this.bankAccount.fundsType = this.funds.fundsType;
			this.bankAccountService.setBankAccount(this.bankAccount).then(bankAccount => {
				this.bankAccount = bankAccount;
				this.router.navigate(['/fundses']);
			});
		}

		if(this.fundsTypeSeleceted == this.fundsTypes['CREDIT_CARD']){
			this.creditCard.description = this.funds.description;
			this.creditCard.fundsType = this.funds.fundsType;
			this.creditCardService.setCreditCard(this.creditCard).then(creditCard => {
				this.creditCard = creditCard;
				this.router.navigate(['/fundses']);
			});
		}

		if(this.fundsTypeSeleceted == this.fundsTypes['DEFAULT']){
			this.fundsService.setFunds(this.funds).then(funds => {
				this.funds = funds;
				this.router.navigate(['/fundses']);
			});
		}
	}

}