import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { UserService } from './user.service'

import {Router} from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.html',
  providers: []
})

export class AuthComponent implements OnInit {
	user: User = new User();
	constructor(private userService: UserService, private router: Router) {}

	ngOnInit(): void {
	}

	signIn():void{
		this.userService.autentica(this.user).subscribe(
            res => {this.router.navigate(['calendar']);},
            err => {}
        );
	}
}