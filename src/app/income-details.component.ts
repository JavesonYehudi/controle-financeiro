// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { FundsService } from './funds.service';
import { IncomeService } from './income.service';

import { Funds }	from './funds';
import { FinancialTransaction } from './financial-transaction';

import {Router} from '@angular/router';

@Component({
  selector: 'my-income-details',
  templateUrl: './create-financial-transaction.component.html',
  providers: []
})

export class IncomeDetailsComponent implements OnInit {
	financialTransaction = new FinancialTransaction();
	financialTransactionType: string;
	fundses: Funds[];
	submitted = false;
	options : Array<string>;
	option: string;
	isEdit = true;

	constructor(
	  private incomeService: IncomeService,
	  private route: ActivatedRoute,
	  private location: Location,
	  private router: Router,
	  private fundsService: FundsService
	) {}

	ngOnInit(): void {
		this.options = ['INCOME', 'EXPENSE'];
		this.getFundses();
		this.route.params
			.switchMap((params: Params) => this.incomeService.getFinancialTransaction(+params['id']))
			.subscribe(financialTransaction => this.financialTransaction = financialTransaction);
	}

	getFundses(): void {
		this.fundsService.getFundses().then(fundses => this.fundses = fundses);
	}

	onSubmit(){
		this.incomeService.updateFinancialTransaction(this.financialTransaction).then(() => {
			this.router.navigate(['/incomes']);
		});
	}

	onDelete(){
		this.incomeService.deleteFinancialTransaction(this.financialTransaction.id).then(() => {
			this.router.navigate(['/incomes']);
		});
	}
}