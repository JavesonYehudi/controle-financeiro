// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { FundsService } from './funds.service';
import { Funds } from './funds';


@Component({
  selector: 'my-funds-details',
  templateUrl: './funds-details.component.html',
  styleUrls: ['./funds-details.component.css'],
  providers: []
})

export class FundsDetailsComponent implements OnInit {
	@Input() funds: Funds;
	constructor(
	  private fundsService: FundsService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.fundsService.getFunds(+params['id']))
			.subscribe(funds => this.funds = funds);
	}

}