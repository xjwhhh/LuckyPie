import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private identifyService: IdentifyService, private router: Router) {
  }

  ngOnInit() {
    //      setInterval(() => {
    //          this.cdr.markForCheck();
    //          console.log(this.user);
    //      }, 100);
  }


  login(account: string, password: string) {
    if (account == "") {
      alert("未输入用户名");
    }
    else if (password == "") {
      alert("未输入密码");
    }
    else {
      this.identifyService.login(account, password).then(user => this.user = user);
    }
  }

  check() {

  }

  gotoRegister() {
    this.router.navigate(['/identify/register']);
  }

  gotoUserInfo() {
    this.router.navigate(['/identify/info', this.user.account]);
    // this.identifyService.gotoUserInfo()
  }
}
