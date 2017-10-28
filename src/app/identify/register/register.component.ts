import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private location: Location, private router: Router) {
  }

  gotoLogin(): void {
    this.router.navigate(['/identify/login']);
  }
}
