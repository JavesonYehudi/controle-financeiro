// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { FundsService } from './funds.service';
import { Funds } from './funds';
import { EFundsType } from './e-funds-type';

import {Router} from '@angular/router';

@Component({
  selector: 'my-funds-details',
  templateUrl: './funds-details.component.html',
  providers: []
})

export class FundsDetailsComponent implements OnInit {
	@Input() funds: Funds;
	eFundsType = EFundsType;
	constructor(
	  private fundsService: FundsService,
	  private route: ActivatedRoute,
	  private router: Router,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.fundsService.getFunds(+params['id']))
			.subscribe(funds => this.funds = funds);
	}

	onSubmit(){
		this.fundsService.updateFunds(this.funds).then(() => {
			this.router.navigate(['/fundses']);
		});
	}

	onDelete(){
		this.fundsService.deleteFunds(this.funds.id).then(() => {
			this.router.navigate(['/fundses']);
		});
	}
}