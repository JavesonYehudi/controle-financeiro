import { Component, OnInit } from '@angular/core';

import { FinancialTransaction }         from './financial-transaction';
import { IncomeService }        from './income.service';
import { ExpenseService }        from './expense.service';
import { Maturity }             from './maturity'
import { Payment }             from './payment'

import {Router} from '@angular/router';


@Component({
  selector: 'cf-calendar',
  templateUrl: './my-calendar.component.html',
  providers: []
})

export class MyCalendarComponent implements OnInit {
	events = new Array<any>();
    eventCalendar: any;
    headerConfig: any;
    financialTransactionFixed = new Array<FinancialTransaction>();
    displayDialog: boolean = false;
    maturity: Maturity = new Maturity();
    payment: Payment = new Payment();
    financialTransaction: FinancialTransaction = new FinancialTransaction();

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
            this.getFinancialTransaction(incomes);
        });

        this.expenseService.getFinancialTransactions().then(expenses => {
            this.getFinancialTransaction(expenses);
        });
    }

    loadEvents(event) {
        this.eventCalendar = event;
        let month = event.view.intervalEnd._d.getMonth()+1;
        let nextMonth = month == 12 ? 1 : month + 1;
        let previousMonth:string = month == 1 ? '12' : (month - 1).toString();

        let year = event.view.intervalEnd._d.getFullYear();

        month = month < 10 ? '0'+month.toString() : month;
        nextMonth = nextMonth < 10 ? '0'+nextMonth.toString() : nextMonth;
        previousMonth = parseInt(previousMonth) < 10 ? '0'+previousMonth : previousMonth.toString();

        let date;
        let nextDate;
        let previousDate;

        for(let financialTransaction of this.financialTransactionFixed){
        	date = year + '-' + month + '-';
        	nextDate = month == 12 ? (year + 1).toString() + '-' + nextMonth + '-' : year + '-' + nextMonth + '-';
        	previousDate = month == 1 ? (year - 1).toString() + '-' + previousMonth + '-' : year + '-' + previousMonth + '-';

            date = date + financialTransaction.firstMaturity.substring(8, 10);

            if(!this.events.some(event => event.title == financialTransaction.description && event.start == date) && financialTransaction.firstMaturity < date)
                this.generateEvent(financialTransaction, undefined, date);

            nextDate = nextDate + financialTransaction.firstMaturity.substring(8, 10);
            if(!this.events.some(event => event.title == financialTransaction.description && event.start == nextDate) && financialTransaction.firstMaturity < nextDate)
                this.generateEvent(financialTransaction, undefined, nextDate);

            previousDate = previousDate + financialTransaction.firstMaturity.substring(8, 10);
            if(!this.events.some(event => event.title == financialTransaction.description && event.start == previousDate) && financialTransaction.firstMaturity < previousDate)
                this.generateEvent(financialTransaction, undefined, previousDate);

        }
    }

    getFinancialTransaction(financialTransactions: Array<FinancialTransaction>){
        for(let financialTransaction of financialTransactions){
            for(let maturity of financialTransaction.maturityList){
                this.generateEvent(financialTransaction, maturity, maturity.date);
            }

            if(financialTransaction.fixedTransaction)
                this.financialTransactionFixed.push(financialTransaction);
        }

        this.loadEvents(this.eventCalendar);
    }

    generateEvent(financialTransaction: FinancialTransaction, maturity: Maturity, date: string) {
        let paidStatus = (maturity != null && maturity.payment != null) ? 'paid' : 'notPaid';
        this.events.push({
            "title": financialTransaction.description, 
            "start": date,
            "className": [financialTransaction.financialTransactionType, paidStatus],
            "maturity": maturity,
            "transacao": financialTransaction
        });
    }

    handleEventClick(event) {
        let maturity = new Maturity();
        let payment = new Payment();
        if(event.calEvent.maturity == undefined){
            maturity.date = event.calEvent.start._i;
            maturity.value = event.calEvent.transacao.valueTransaction;
        } else{
            maturity = event.calEvent.maturity;
        }

        if(maturity.payment != null){
            payment = maturity.payment;
            maturity.payment = null;
        }else{
            payment.valuePaid = maturity.value;
            payment.datePayment = maturity.date;
        }

        payment.maturity = maturity;
        this.payment = payment;
        this.financialTransaction = event.calEvent.transacao;
        this.displayDialog = true;
    }

    onPaymentSubmit(){
        if(this.financialTransaction.financialTransactionType.toString() == 'EXPENSE'){
            this.expenseService.pay(this.payment, this.financialTransaction).then(() => this.displayDialog = false);
        }
        if(this.financialTransaction.financialTransactionType.toString() == 'INCOME'){
            this.incomeService.pay(this.payment, this.financialTransaction).then(() => {
                this.displayDialog = false;
                this.router.navigate(['/calendar']);
            });
        }
    }
}