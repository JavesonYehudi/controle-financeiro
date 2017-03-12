import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'auth',
  templateUrl: './auth.html',
  providers: []
})

export class AuthComponent implements OnInit {
	constructor(private _tokenService: Angular2TokenService) {
        this._tokenService.init({
	        apiBase: null
        });
    }

	ngOnInit(): void {
		console.log(this);
	}

	signIn():void{
		this._tokenService.signIn({
		    email:    'example@example.org',
		    password: 'secretPassword'
		}).subscribe(
		    res =>      console.log(res),
		    error =>    console.log(error)
		);
	}
}