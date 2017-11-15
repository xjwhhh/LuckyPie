import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Share, User} from 'app/entity/entity';

@Component({
  selector: 'user-photo',
  templateUrl: './usershare.component.html',
  styleUrls: ['./usershare.component.css'],
})
export class UserPhotoComponent implements OnInit {

  userId: number;

  shares: Share[];

  selectedShare: Share = new Share();

  user: User;

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.userId).then(user => this.user = user);
    this.getUserShares(this.userId);
  }

  getUserShares(userId: number) {
    this.identifyService.getUserShares(userId).then(shares => this.shares = shares);
  }

  onClickShare(shareid: number) {
    this.shares.forEach((share, i) => {
      if (share.id == shareid) {
        this.selectedShare = share;
        //todo 标签问题
        console.log(this.selectedShare);
      }
    });
    this.setCurrentStyles();
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
    console.log("success");
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

  fixheight = window.outerHeight;


}
