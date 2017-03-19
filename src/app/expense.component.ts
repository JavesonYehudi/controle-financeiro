import { Component, OnInit } from '@angular/core';

import { FinancialTransaction } 		from './financial-transaction';
import { ExpenseService } 		from './expense.service';

import {Router} from '@angular/router';

@Component({
  selector: 'my-expense',
  templateUrl: './expense.component.html',
  providers: []
})

export class ExpenseComponent implements OnInit {
	selectedExpense: FinancialTransaction;	
	expenses:FinancialTransaction[];

	constructor(
		private router: Router,
		private expenseService: ExpenseService) { }

	ngOnInit(): void {
		this.getExpenses();
	}

	getExpenses(): void {
		this.expenseService.getFinancialTransactions().then(expenses => this.expenses = expenses);
	}

	onSelect(expense: FinancialTransaction): void {
		this.selectedExpense = expense;
		this.router.navigate(['expense/detail', this.selectedExpense.id]);

	}

	gotoCreate(): void{
		this.router.navigate(['/financial-transaction/create']);
	}
}