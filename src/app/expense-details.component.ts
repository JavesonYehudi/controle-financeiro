// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { ExpenseService } from './expense.service';
import { FinancialTransaction } from './financial-transaction';


@Component({
  selector: 'my-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css'],
  providers: []
})

export class ExpenseDetailsComponent implements OnInit {
	@Input() expense: FinancialTransaction;

	constructor(
	  private expenseService: ExpenseService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.expenseService.getFinancialTransaction(+params['id']))
			.subscribe(expense => this.expense = expense);
	}

}