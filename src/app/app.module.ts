import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }                from './app.component';

import { FundsesComponent }            from './fundses.component';
import { IncomeComponent }             from './income.component';
import { ExpenseComponent }             from './expense.component';

import { FundsDetailsComponent }       from './funds-details.component';
import { IncomeDetailsComponent }       from './income-details.component';
import { ExpenseDetailsComponent }       from './expense-details.component';
import { BankAccountDetailsComponent } from './bank-account-details.component';
import { CreditCardDetailsComponent }  from './credit-card-details.component';

import { CreateFundsComponent }        from './create-funds.component';
import { CreateFinancialTransactionComponent } from './create-financial-transaction.component';

import { FundsService }                from './funds.service';
import { IncomeService }               from './income.service';
import { ExpenseService }               from './expense.service';
import { BankAccountService }          from './bank-account.service';
import { CreditCardService }           from './credit-card.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FundsesComponent,
    IncomeComponent,
    ExpenseComponent,
    CreateFundsComponent,
    CreateFinancialTransactionComponent,
    FundsDetailsComponent,
    IncomeDetailsComponent,
    ExpenseDetailsComponent,
    CreditCardDetailsComponent,
    BankAccountDetailsComponent
  ],
  providers: [ FundsService, CreditCardService, BankAccountService, IncomeService, ExpenseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
