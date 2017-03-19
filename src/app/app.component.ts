import { Component} from '@angular/core';
import { Funds } from './funds';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent{
	constructor(private user: UserService){ }
}