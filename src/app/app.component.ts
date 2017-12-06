import { Component, OnInit } from '@angular/core';
import { IdentifyService } from 'app/identify/identify.service';
import { NoticeService } from 'app/notice/notice.service';
import { Router } from '@angular/router';
import { Notice, User } from 'app/entity/entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';

  userId: number = -1;

  thumbNumber: number;

  commentNumber: number;


  constructor(private router: Router, private identifyService: IdentifyService, private noticeService: NoticeService) {

  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();


  }

  getNotice(noticeArray: Notice[]) {
    this.userId = this.identifyService.getUserId();
    this.noticeService.getNewThumbNotice(this.userId).then(noticeArray => this.thumbNumber = noticeArray.length);
    this.noticeService.getNewCommentNotice(this.userId).then(noticeArray => this.commentNumber = noticeArray.length);
  }

  gotoFollow() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      this.router.navigate(['/follow', this.userId]);
    }

  }

  gotoPost() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      this.router.navigate(['/post', this.userId]);
    }

  }

  gotoExplore() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      this.router.navigate(['/explore', this.userId]);
    }

  }

  gotoHot() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      this.router.navigate(['/hot', this.userId]);
    }

  }

  gotoNotice() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      this.router.navigate(['/notice', this.userId]);
    }

  }

  gotoUserInfo() {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      this.router.navigate(['/identify/info', this.userId]);
    }
  }

  search(content: string) {
    this.userId = this.identifyService.getUserId();
    if (this.userId == -1) {
      alert("请先登录或注册");
    } else {
      if (content == "") {
        alert("未输入搜索内容");
      } else {
        this.router.navigate(['/search', this.userId],{queryParams:{'content':content}});
      }
    }
  }
}
