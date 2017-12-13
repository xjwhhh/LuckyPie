import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  xaccount: string;

  xpassword: string;

  constructor(private identifyService: IdentifyService, private router: Router) {
  }

  ngOnInit() {
    this.xaccount = localStorage.getItem("account") + "";
    this.xpassword = localStorage.getItem("password") + "";
    console.log(this.xaccount);


  }

  login(account: string, password: string, isSave: any) {
    console.log(isSave);

    if (account == "") {
      alert("未输入用户名");
    }
    else if (password == "") {
      alert("未输入密码");
    }
    else {
      this.identifyService.login(account, password).then(user => this.check(user, isSave));

    }
  }

  check(user: User, isSave: any) {
    if (user.id == null) {
      alert("用户名或密码错误");
    }
    else {
      this.gotoUserInfo(user);
      if (isSave == true) {
        localStorage.setItem("account", this.xaccount);
        localStorage.setItem("password", this.xpassword);
      }
      // this.onLogin.emit(true);
    }
  }

  gotoRegister() {
    this.router.navigate(['/identify/register']);
  }

  gotoUserInfo(user: User) {
    this.identifyService.setUserId(user.id);
    this.router.navigate(['/identify/info', user.id]);
  }
}
