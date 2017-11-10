import {Component, OnInit} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';

  userId: number = 1;

  constructor(private router: Router, private identifyService: IdentifyService) {

  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
  }

  gotoFollow() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    }
    else {
      this.router.navigate(['/follow', this.userId]);
    }

  }

  gotoPost() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    }
    else {
      this.router.navigate(['/post', this.userId]);
    }

  }

  gotoExplore() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    }
    else {
      this.router.navigate(['/explore', this.userId]);
    }

  }

  gotoHot() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    }
    else {
      this.router.navigate(['/hot', this.userId]);
    }

  }

  gotoNotice() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    }
    else {
      this.router.navigate(['/notice', this.userId]);
    }

  }

  gotoUserInfo() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    }
    else {
      this.router.navigate(['/identify/info', this.userId]);
    }

  }


}
