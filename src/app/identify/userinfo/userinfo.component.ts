import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {User, ResultMessage} from 'app/entity/entity';
import {
  FileUploader
} from 'ng2-file-upload';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserInfoComponent implements OnInit {

  userId: number;

  user: User = new User();

  uploader: FileUploader = new FileUploader({url: '图片上传地址'});

  userHead: string;

  buttonStyle = {
    'display': 'none'
  };

  followIdArray: number[]=[];
  followerIdArray: number[]=[];

  followArray: User[] = [];

  ifWantChange = false;


  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    this.getUserBasicInfo(this.userId);
  }

  getUserBasicInfo(userId: number) {
    this.identifyService.getUserBasicInfo(userId).then(user => {
      this.user = user;
      this.userHead = this.user.head
    });
    this.identifyService.getUserFollows(userId).then(userIdArray => this.followIdArray = userIdArray);
    this.identifyService.getUserFollowers(userId).then(userIdArray => this.followerIdArray = userIdArray);

  }

  selectedFileOnChanged() {
    let $this = this;
    let reader = new FileReader();
    reader.readAsDataURL(this.uploader.queue[this.uploader.queue.length - 1].some);
    reader.onload = function () {
      $this.user.head = this.result;
    }
    this.buttonStyle = {
      'display': 'block'
    };
  }

  updateHead() {
    this.identifyService.updateHead(this.userId, this.user.head).then(resultMessage => this.check(resultMessage));
  }

  check(resultMessage: ResultMessage) {
    if (resultMessage.result == "success") {
      alert("更新头像成功");
      this.buttonStyle = {
        'display': 'none'
      };
      this.uploader.queue.splice(0, this.uploader.queue.length);
      this.ifWantChange = false;
    } else {
      this.user.head = this.userHead;
      alert("更新头像失败");
      this.buttonStyle = {
        'display': 'none'
      };
      this.uploader.queue.splice(0, this.uploader.queue.length);
      this.ifWantChange = true;
    }

  }

  cancel() {
    this.user.head = this.userHead;
    this.buttonStyle = {
      'display': 'none'
    };
    this.uploader.queue.splice(0, this.uploader.queue.length);
    this.ifWantChange = false;
  }

  getFollowsInfo() {
    this.followArray.splice(0, this.followArray.length);
    for (let i = 0; i < this.followIdArray.length; i++) {
      this.identifyService.getUserBasicInfo(this.followIdArray[i]).then(user => this.followArray.push(user));
    }
  }

  getFollowersInfo() {
    this.followArray.splice(0, this.followArray.length);
    for (let i = 0; i < this.followerIdArray.length; i++) {
      this.identifyService.getUserBasicInfo(this.followerIdArray[i]).then(user => this.followArray.push(user));
    }
  }

  gotoHomePage(ownerId) {
    if (ownerId == this.userId) {
      this.router.navigate(['/identify/info', ownerId]);
    } else {
      this.router.navigate(['/identify/homePage', ownerId]);
    }
  }

  wantChange() {
    this.ifWantChange = true;
  }


}
