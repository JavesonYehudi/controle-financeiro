// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { CreditCardService } from './credit-card.service';
import { CreditCard } 		  from './credit-card';
import { EFundsType } 		  from './e-funds-type';

import {Router} from '@angular/router';

@Component({
  selector: 'my-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  providers: []
})

export class CreditCardDetailsComponent implements OnInit {
	@Input() creditCard: CreditCard;
	EFundsType : typeof EFundsType = EFundsType;

	constructor(
	  private creditCardService: CreditCardService,
	  private route: ActivatedRoute,
	  private router: Router,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.creditCardService.getCreditCard(+params['id']))
			.subscribe(creditCard => this.creditCard = creditCard);
	}

	onSubmit(){
		this.creditCardService.updateCreditCard(this.creditCard).then(() => {
				this.router.navigate(['/fundses']);
			});
	}

	onDelete(){
		this.creditCardService.deleteCreditCard(this.creditCard.id).then(() => {
			this.router.navigate(['/fundses']);
		});
	}
}