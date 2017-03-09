import { Component, OnInit } from '@angular/core';

import { Funds } 		from './funds';
import { FundsService } from './funds.service';
import { EFundsType }	from './e-funds-type';

import {Router} from '@angular/router';

@Component({
  selector: 'my-fundses',
  templateUrl: './fundses.component.html',
  styleUrls: ['./fundses.component.css'],
  providers: []
})

export class FundsesComponent implements OnInit {
	selectedFunds: Funds;	
	fundses:Funds[];

	constructor(
		private router: Router,
		private fundsService: FundsService) { }

	ngOnInit(): void {
		this.getFundses();
	}

	getFundses(): void {
		this.fundsService.getFundses().then(fundses => this.fundses = fundses);
	}

	onSelect(funds: Funds): void {
		this.selectedFunds = funds;

		if(EFundsType[this.selectedFunds.fundsType.toString()] == EFundsType['BANK_ACCOUNT']){
			this.router.navigate(['/bank-account/detail', this.selectedFunds.id]);
		}else if(EFundsType[this.selectedFunds.fundsType.toString()] == EFundsType['CREDIT_CARD']){
			this.router.navigate(['/credit_card/detail', this.selectedFunds.id]);
		}else{
			this.router.navigate(['/funds/detail', this.selectedFunds.id]);
		}
	}

	gotoCreate(): void{
		this.router.navigate(['/funds/create']);
	}
}