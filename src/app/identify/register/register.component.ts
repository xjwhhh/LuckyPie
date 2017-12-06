import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {User} from 'app/entity/entity';
import {IdentifyService} from 'app/identify/identify.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();

  constructor(private router: Router, private identifyService: IdentifyService) {
  }


  register(account: string, password: string, ensurePassword: string) {
    if (account == "") {
      alert("未输入用户名");
    } else if (password == "") {
      alert("未输入密码");
    } else if (ensurePassword == "") {
      alert("未输入确认密码");
    } else if (ensurePassword != password) {
      alert("两次输入的密码不同");
    } else {
      this.identifyService.register(account, password).then(user => this.check(user));
    }
  }

  //看是否创建成功
  check(user: User) {
    if (user.id == null) {
      alert("账号名已存在");
    } else {
      this.gotoUserInfo(user);
    }
  }

  gotoLogin(): void {
    this.router.navigate(['/identify/login']);
  }

  gotoUserInfo(user: User) {
    this.identifyService.setUserId(user.id);
    this.router.navigate(['/identify/info', user.id]);
  }
}
