import { Component, OnInit } from '@angular/core';

import { FinancialTransaction }         from './financial-transaction';
import { IncomeService }        from './income.service';
import { ExpenseService }        from './expense.service';

import {Router} from '@angular/router';


@Component({
  selector: 'cf-calendar',
  templateUrl: './my-calendar.component.html',
  providers: []
})

export class MyCalendarComponent implements OnInit {
	events = new Array<any>();
    headerConfig: any;
    financialTransactionFixed = new Array<FinancialTransaction>();

    ngOnInit() {
        this.getTransactions();
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

    getTransactions(): void {
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
        });

        this.expenseService.getFinancialTransactions().then(expenses => {
            for(let expense of expenses){
                for(let maturity of expense.maturityList){
                    this.events.push({
                        "title": expense.description,
                        "start": maturity.date
                    });
                }
                if(expense.fixedTransaction)
                    this.financialTransactionFixed.push(expense);
            }
        });
    }

    loadEvents(event) {
        let month = event.view.intervalEnd._d.getMonth()+1;
        let year = event.view.intervalEnd._d.getFullYear();

        month = month < 10 ? '0'+month.toString() : month;
        for(let financialTransaction of this.financialTransactionFixed){
            let date = year + '-' + month + '-' + financialTransaction.firstMaturity.substring(8, 10);
            if(!this.events.some(event => event.title == financialTransaction.description && event.start == date) && financialTransaction.firstMaturity < date)
                this.events.push({"title": financialTransaction.description, "start": date});
        }
    }
}