import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {Location} from '@angular/common';
import {IdentifyService} from 'app/identify/identify.service';
import {User, ResultMessage} from 'app/entity/entity';
import {
  FileUploader
} from 'ng2-file-upload';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  // styleUrls: ['./login.component.css'],
})
export class UserInfoComponent implements OnInit {

  userId: number;

  user: User = new User();

  uploader: FileUploader = new FileUploader({url: '图片上传地址'});

  userHead: string;

  buttonStyle = {
    'display': 'none'
  };


  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    // console.log(this.userId);
    this.getUserBasicInfo(this.userId);
  }

  getUserBasicInfo(userId: number) {
    this.identifyService.getUserBasicInfo(userId).then(user => {
      this.user = user;
      this.userHead = this.user.head
    });
  }

  selectedFileOnChanged() {
    let $this = this;
    let reader = new FileReader();
    reader.readAsDataURL(this.uploader.queue[this.uploader.queue.length - 1].some);
    console.log(reader);
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
    console.log(this.uploader.queue);
    if (resultMessage.result == "success") {
      alert("更新头像成功");
      this.buttonStyle = {
        'display': 'none'
      };
      this.uploader.queue.splice(0, this.uploader.queue.length);
      console.log(this.uploader.queue);
    } else {
      this.user.head = this.userHead;
      alert("更新头像失败");
      this.buttonStyle = {
        'display': 'none'
      };
      this.uploader.queue.splice(0, this.uploader.queue.length);
    }

  }

  cancel() {
    this.user.head = this.userHead;
    this.buttonStyle = {
      'display': 'none'
    };
    this.uploader.queue.splice(0, this.uploader.queue.length);
  }


}
