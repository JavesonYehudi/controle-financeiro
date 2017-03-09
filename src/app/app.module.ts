import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }                from './app.component';
import { FundsesComponent }            from './fundses.component';
import { FundsDetailsComponent }       from './funds-details.component';
import { CreateFundsComponent }                from './create-funds.component';
import { FundsService }                from './funds.service';
import { BankAccountService }          from './bank-account.service';
import { BankAccountDetailsComponent } from './bank-account-details.component';

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
    CreateFundsComponent,
    FundsDetailsComponent,
    BankAccountDetailsComponent
  ],
  providers: [ FundsService, BankAccountService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
