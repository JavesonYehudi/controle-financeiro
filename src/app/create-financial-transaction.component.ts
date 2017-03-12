import { Component, OnInit } from '@angular/core';

import { Funds }	from './funds';
import { FinancialTransaction }	from './financial-transaction';

import { FundsService } from './funds.service';
import { IncomeService } from './income.service';
import { ExpenseService } from './expense.service';

import {Router} from '@angular/router';

@Component({
  selector: 'create-financial-transaction',
  templateUrl: './create-financial-transaction.component.html',
  providers: []
})

export class CreateFinancialTransactionComponent implements OnInit {
	financialTransaction = new FinancialTransaction();
	financialTransactionType: string;
	fundses: Funds[];
	submitted = false;
	options : Array<string>;
	option: string;

	constructor(
		private router: Router,
		private fundsService: FundsService,
		private incomeService: IncomeService,
		private expenseService: ExpenseService) { }

	ngOnInit(): void {
		this.options = ['INCOME', 'EXPENSE'];
		this.getFundses();
	}

	getFundses(): void {
		this.fundsService.getFundses().then(fundses => this.fundses = fundses);
	}

	onSubmit(){
		this.submitted = true;
		console.log(this.option);
		if(this.option == 'INCOME'){
			this.incomeService.setFinancialtransaction(this.financialTransaction).then(financialTransaction => {
				this.financialTransaction = financialTransaction;
				this.router.navigate(['/incomes']);
			} );
		}

		if(this.option == 'EXPENSE'){
			this.expenseService.setFinancialtransaction(this.financialTransaction).then(financialTransaction => {
				this.financialTransaction = financialTransaction;
				this.router.navigate(['/expenses']);
			} );
		}
	}

}