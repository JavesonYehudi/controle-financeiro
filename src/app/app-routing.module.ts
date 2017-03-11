import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundsesComponent }      from './fundses.component';
import { CreateFundsComponent } from './create-funds.component';
import { FundsDetailsComponent } from './funds-details.component';
import { BankAccountDetailsComponent } from './bank-account-details.component';
import { CreditCardDetailsComponent } from './credit-card-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/fundses', pathMatch: 'full' },
  { path: 'fundses', component: FundsesComponent },
  { path: 'funds/create', component: CreateFundsComponent },
  { path: 'funds/detail/:id', component: FundsDetailsComponent },
  { path: 'bank-account/detail/:id', component: BankAccountDetailsComponent },
  { path: 'credit-card/detail/:id', component: CreditCardDetailsComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
