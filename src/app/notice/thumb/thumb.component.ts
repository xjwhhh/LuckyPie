import {
  Component,
  OnInit
} from '@angular/core';
import {
  NoticeService
} from 'app/notice/notice.service';
import {Notice, User, ResultMessage} from 'app/entity/entity';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';


@Component({
  selector: 'notice-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css'],
})
export class NoticeThumbComponent implements OnInit {

  userId: number;

  newNoticeArray: Notice[] = [];
  newStartUserArray: User[] = [];
  newPostArray: any[] = [];

  oldNoticeArray: Notice[] = [];
  oldStartUserArray: User[] = [];
  oldPostArray: any[] = [];


  constructor(private noticeService: NoticeService, private router: Router) {

  }

  ngOnInit() {
    this.userId = this.noticeService.getUserId();
    console.log(this.userId);
    this.getNewNoticeArray();
    this.getOldNoticeArray();
  }

  getNewNoticeArray() {
    this.noticeService.getNewThumbNotice(this.userId).then(noticeArray => this.setNewNotice(noticeArray));

  }

  getOldNoticeArray() {
    this.noticeService.getOldThumbNotice(this.userId).then(noticeArray => this.setOldNotice(noticeArray));

  }

  setNewNotice(noticeArray: Notice[]) {
    this.newNoticeArray = noticeArray;
    for (let i = noticeArray.length - 1; i >= 0; i--) {
      let startUserId = noticeArray[i].startUserId;
      this.noticeService.getUserBasicInfo(startUserId).then(user => this.newStartUserArray.push(user));
      let type = noticeArray[i].type;
      if (type == "分享点赞") {
        this.noticeService.getShareByShareId(noticeArray[i].postId).then(share => this.newPostArray.push(share));
      } else if (type == "相册点赞") {
      }
    }
  }

  setOldNotice(noticeArray: Notice[]) {
    this.oldNoticeArray = noticeArray;
    console.log(this.oldNoticeArray);
    for (let i = noticeArray.length - 1; i >= 0; i--) {
      let startUserId = noticeArray[i].startUserId;
      this.noticeService.getUserBasicInfo(startUserId).then(user => this.oldStartUserArray.push(user));
      let type = noticeArray[i].type;
      if (type == "分享点赞") {
        this.noticeService.getShareByShareId(noticeArray[i].postId).then(share => this.oldPostArray.push(share));
      } else if (type == "相册点赞") {
      }
    }
  }

  setAllIsReadTrue() {
    let noticeIdArray = "";
    for (let i = 0; i < this.newNoticeArray.length - 1; i++) {
      noticeIdArray = noticeIdArray + this.newNoticeArray[i].id + ",";
    }
    noticeIdArray = noticeIdArray + this.newNoticeArray[this.newNoticeArray.length - 1].id;
    this.noticeService.setAllIsReadTrue(noticeIdArray).then(result => this.refresh(result));
  }

  refresh(result: ResultMessage) {
    if (result.result == "success") {
      console.log("34");
      this.getNewNoticeArray();
      this.getOldNoticeArray();
    }
  }


  gotoStartUser(userId: number) {
    this.router.navigate(['/identify/homePage', userId]);
  }


}
