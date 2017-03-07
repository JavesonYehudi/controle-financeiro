import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundsesComponent }      from './fundses.component';
import { FundsDetailsComponent } from './funds-details.component';
import { BankAccountDetailsComponent } from './bank-account-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/fundses', pathMatch: 'full' },
  { path: 'fundses', component: FundsesComponent },
  { path: 'funds/detail/:id', component: FundsDetailsComponent},
  { path: 'bank-account/detail/:id', component: BankAccountDetailsComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
