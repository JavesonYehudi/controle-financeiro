import { Component, OnInit } from '@angular/core';

import { Funds } 		from './funds';
import { FundsService } from './funds.service';
import { EFundsType }	from './e-funds-type';
import { EFundsTypePath }	from './e-funds-type-path';

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
	fundsTypePath = EFundsTypePath;

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
		this.router.navigate([this.fundsTypePath[this.selectedFunds.fundsType], this.selectedFunds.id]);

	}

	gotoCreate(): void{
		this.router.navigate(['/funds/create']);
	}
}