// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { IncomeService } from './income.service';
import { FinancialTransaction } from './financial-transaction';


@Component({
  selector: 'my-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.css'],
  providers: []
})

export class IncomeDetailsComponent implements OnInit {
	@Input() income: FinancialTransaction;

	constructor(
	  private incomeService: IncomeService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.incomeService.getFinancialTransaction(+params['id']))
			.subscribe(income => this.income = income);
	}

}