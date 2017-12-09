import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Dating, User,ResultMessage} from 'app/entity/entity';

@Component({
  selector: 'user-activity',
  templateUrl: './userdate.component.html',
  styleUrls: ['./userdate.component.css'],
})
export class UserActivityComponent implements OnInit {
  userId: number;

  user: User;

  datings: Dating[];

  selectedDating: Dating = new Dating();

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.userId).then(user => this.user = user);
    this.getUserDating(this.userId);

  }

  getUserDating(userId: number) {
    this.identifyService.getUserDating(userId).then(datings => this.datings = datings);
  }

  onClickDating(datingId: number) {
    this.datings.forEach((dating, i) => {
      if (dating.id == datingId) {
        this.selectedDating = dating;
      }
    });
    this.setCurrentStyles();
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId +
    '/tagdetail', tag
    ]);
  }

  currentStyles = {
    'width': '0',
    'height': '0',
    'opacity': '1',
    'background-color': '#000',
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'z-index': '-1',
    'display': 'none'
  };

  setCurrentStyles() {
    this.currentStyles = {
      'width': '100%',
      'height': '100%',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '1000',
      'display': 'block'
    };
  }

  closeBigPicture() {
    this.currentStyles = {
      'width': '0',
      'height': '0',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '-1',
      'display': 'none'
    };
  }

   deleteDating(){
    this.identifyService.deleteDating(this.selectedDating.id).then(resultMessage=>this.checkDelete(resultMessage));
  }

  checkDelete(resultMessage:ResultMessage){
    if(resultMessage.result=="success"){
      alert("删除约拍成功");
      this.closeBigPicture();
      this.getUserDating(this.userId);
    }
    else{
      alert("删除约拍失败");
    }
  }


}
