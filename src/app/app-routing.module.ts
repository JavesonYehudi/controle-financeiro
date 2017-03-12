import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundsesComponent }      from './fundses.component';
import { IncomeComponent }      from './income.component';
import { ExpenseComponent }      from './expense.component';
import { CreateFundsComponent } from './create-funds.component';
import { CreateFinancialTransactionComponent } from './create-financial-transaction.component';
import { FundsDetailsComponent } from './funds-details.component';
import { IncomeDetailsComponent } from './income-details.component';
import { ExpenseDetailsComponent } from './expense-details.component';
import { BankAccountDetailsComponent } from './bank-account-details.component';
import { CreditCardDetailsComponent } from './credit-card-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/fundses', pathMatch: 'full' },
  { path: 'fundses', component: FundsesComponent },
  { path: 'incomes', component: IncomeComponent },
  { path: 'expenses', component: ExpenseComponent },
  { path: 'funds/create', component: CreateFundsComponent },
  { path: 'financial-transaction/create', component: CreateFinancialTransactionComponent },
  { path: 'funds/detail/:id', component: FundsDetailsComponent },
  { path: 'income/detail/:id', component: IncomeDetailsComponent },
  { path: 'expense/detail/:id', component: ExpenseDetailsComponent },
  { path: 'bank-account/detail/:id', component: BankAccountDetailsComponent },
  { path: 'credit-card/detail/:id', component: CreditCardDetailsComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
