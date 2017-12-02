import {
  Component,
  OnInit
} from '@angular/core';
import {
  NoticeService
} from 'app/notice/notice.service';
import {Notice, User} from 'app/entity/entity';


@Component({
  selector: 'notice-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css'],
  // providers:[NoticeService]
})
export class NoticeThumbComponent implements OnInit {

  userId: number;

  noticeArray: Notice[] = [];

  startUserArray: User[] = [];

  postArray: any[] = [];


  constructor(private noticeService: NoticeService) {

  }

  ngOnInit() {
    this.userId = this.noticeService.getUserId();
    console.log(this.userId);
    this.noticeService.getThumbNotice(this.userId).then(noticeArray => this.setNotice(noticeArray));
  }

  setNotice(noticeArray: Notice[]) {
    this.noticeArray = noticeArray;
    for (let i = 0; i < noticeArray.length; i++) {
      let startUserId = noticeArray[i].startUserId;
      this.noticeService.getUserBasicInfo(startUserId).then(user => this.startUserArray.push(user));
      let type = noticeArray[i].type;
      if (type == "分享点赞") {
        this.noticeService.getShareByShareId(noticeArray[i].postId);

      } else if (type == "相册点赞") {

      }
    }
  }


}
