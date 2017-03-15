import { Component, OnInit } from '@angular/core';

import { FinancialTransaction }         from './financial-transaction';
import { IncomeService }        from './income.service';
import { ExpenseService }        from './expense.service';

import {Router} from '@angular/router';


@Component({
  selector: 'cf-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css'],
  providers: []
})

export class MyCalendarComponent implements OnInit {
	events = new Array<any>();
    headerConfig: any;
    financialTransactionFixed = new Array<FinancialTransaction>();

    ngOnInit() {
        this.getIncomes();
        this.getExpenses();
        this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: null
        };
    }

    constructor(
        private router: Router,
        private incomeService: IncomeService,
        private expenseService: ExpenseService) { }

    getIncomes(): void {
        this.incomeService.getFinancialTransactions().then(incomes => {
            for(let income of incomes){
                for(let maturity of income.maturityList){
                    this.events.push({
                        "title": income.description,
                        "start": maturity.date
                    });
                }
                if(income.fixedTransaction)
                   this.financialTransactionFixed.push(income);
            }
            console.log(this.financialTransactionFixed);
        });
    }

    getExpenses(): void {
        this.expenseService.getFinancialTransactions().then(expenses => {
            for(let expense of expenses){
                for(let maturity of expense.maturityList){
                    this.events.push({
                        "title": expense.description,
                        "start": maturity.date
                    });
                }
            }
        });
    }

    loadEvents(event) {
        let start = event.view.start
        let end = event.view.end
        console.log(start._d);
        console.log(end._d);
        this.events.push({"title": "Teste", "start": "2017-03-10"});
    }
}