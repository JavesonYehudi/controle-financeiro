import { Component, OnInit } from '@angular/core';

import { EFundsType }	from './e-funds-type';
import { FundsService } from './funds.service';

import {Router} from '@angular/router';

@Component({
  selector: 'create-funds',
  templateUrl: './create-funds.component.html',
  styleUrls: ['./create-funds.component.css'],
  providers: []
})

export class CreateFundsComponent implements OnInit {
	fundsTypes = EFundsType;
	fundsTypeSeleceted: EFundsType;
	options : Array<string>;
	constructor(
		private router: Router,
		private fundsService: FundsService) { }

	ngOnInit(): void {
		this.options = ['DEFAULT', 'BANK_ACCOUNT', 'CREDIT_CARD'];
	}

	onFundsSeleceted(fundsType: string): void {
		this.fundsTypeSeleceted = this.fundsTypes[fundsType];
	}
}