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
import { MyCalendarComponent } from './my-calendar.component';
import { AuthComponent } from './auth.component';
import { LoggedInGuard } from './logged-in-guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'fundses', component: FundsesComponent, canActivate: [LoggedInGuard] },
  { path: 'incomes', component: IncomeComponent, canActivate: [LoggedInGuard] },
  { path: 'expenses', component: ExpenseComponent, canActivate: [LoggedInGuard] },
  { path: 'funds/create', component: CreateFundsComponent, canActivate: [LoggedInGuard] },
  { path: 'financial-transaction/create', component: CreateFinancialTransactionComponent, canActivate: [LoggedInGuard] },
  { path: 'funds/detail/:id', component: FundsDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'income/detail/:id', component: IncomeDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'expense/detail/:id', component: ExpenseDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'bank-account/detail/:id', component: BankAccountDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'credit-card/detail/:id', component: CreditCardDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'calendar', component: MyCalendarComponent, canActivate: [LoggedInGuard], },
  { path: '**', component: AuthComponent, canActivate: [LoggedInGuard] }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
