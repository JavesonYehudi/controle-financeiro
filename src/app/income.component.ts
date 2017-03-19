import { Component, OnInit } from '@angular/core';

import { FinancialTransaction } 		from './financial-transaction';
import { IncomeService } 		from './income.service';

import {Router} from '@angular/router';

@Component({
  selector: 'my-income',
  templateUrl: './income.component.html',
  providers: []
})

export class IncomeComponent implements OnInit {
	selectedIncome: FinancialTransaction;	
	incomes:FinancialTransaction[];

	constructor(
		private router: Router,
		private incomeService: IncomeService) { }

	ngOnInit(): void {
		this.getIncomes();
	}

	getIncomes(): void {
		this.incomeService.getFinancialTransactions().then(incomes => this.incomes = incomes);
	}

	onSelect(income: FinancialTransaction): void {
		this.selectedIncome = income;
		this.router.navigate(['income/detail', this.selectedIncome.id]);

	}

	gotoCreate(): void{
		this.router.navigate(['/financial-transaction/create']);
	}
}