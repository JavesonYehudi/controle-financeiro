// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { BankAccountService } from './bank-account.service';
import { BankAccount } 		  from './bank-account';
import { EFundsType } 		  from './e-funds-type';


@Component({
  selector: 'my-bank-account-details',
  templateUrl: './bank-account-details.component.html',
  styleUrls: ['./bank-account-details.component.css'],
  providers: []
})

export class BankAccountDetailsComponent implements OnInit {
	@Input() bankAccount: BankAccount;
	EFundsType : typeof EFundsType = EFundsType;

	constructor(
	  private BankAccountService: BankAccountService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.BankAccountService.getBankAccount(+params['id']))
			.subscribe(bankAccount => this.bankAccount = bankAccount);
	}

}