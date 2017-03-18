// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { BankAccountService } from './bank-account.service';
import { BankAccount } 		  from './bank-account';
import { EFundsType } 		  from './e-funds-type';

import {Router} from '@angular/router';

@Component({
  selector: 'my-bank-account-details',
  templateUrl: './bank-account-details.component.html',
  providers: []
})

export class BankAccountDetailsComponent implements OnInit {
	@Input() bankAccount: BankAccount;
	EFundsType : typeof EFundsType = EFundsType;

	constructor(
	  private bankAccountService: BankAccountService,
	  private route: ActivatedRoute,
	  private router: Router,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.bankAccountService.getBankAccount(+params['id']))
			.subscribe(bankAccount => this.bankAccount = bankAccount);
	}

	onSubmit(){
		this.bankAccountService.updateBankAccount(this.bankAccount).then(() => {
				this.router.navigate(['/fundses']);
			});
	}

	onDelete(){
		this.bankAccountService.deleteBankAccount(this.bankAccount.id).then(() => {
			this.router.navigate(['/fundses']);
		});
	}
}