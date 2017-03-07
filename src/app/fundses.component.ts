import { Component, OnInit } from '@angular/core';
import { Funds } from './funds';
import { FundsService } from './funds.service';

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

		if(this.selectedFunds.fundsType == 'BANK_ACCOUNT'){
			this.router.navigate(['/bank-account/detail', this.selectedFunds.id]);
		}else if(this.selectedFunds.fundsType == 'CREDIT_CARD'){
			this.router.navigate(['/credit_card/detail', this.selectedFunds.id]);
		}else{
			this.router.navigate(['/funds/detail', this.selectedFunds.id]);
		}
	}

}