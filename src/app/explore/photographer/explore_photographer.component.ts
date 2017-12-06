import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  User,
  Share,
  ResultMessage
} from 'app/entity/entity';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';

@Component({
  selector: 'explore-photographer',
  templateUrl: './explore_photographer.component.html',
  // styleUrls: ['./explore_photographer.component.css'],
})
export class ExplorePhotographerComponent implements OnInit {

  selectedShare: Share = new Share();

  userId: number;

  photographerArray: User[];

  followButtonContent = [];

  constructor(private exploreService: ExploreService, private router: Router) {
  }

  ngOnInit(): void {
    this.userId = this.exploreService.getUserId();
    this.selectHotPhotographers();
  }

  selectHotPhotographers() {
    this.exploreService.getHotPhotographer().then(users => this.setPhotographers(users));
  }

  selectBestPhotographers() {
    this.exploreService.getBestPhotographer().then(users => this.setPhotographers(users));
  }

  selectNewPhotographers() {
    this.exploreService.getNewPhotographer().then(users => this.setPhotographers(users));
  }

  setPhotographers(users: User[]) {
    this.followButtonContent.splice(0, this.followButtonContent.length);
    this.photographerArray = users;
    for (let i = 0; i < this.photographerArray.length; i++) {
      this.exploreService.getUserShares(this.photographerArray[i].id).then(shares => this.photographerArray[i].shares = shares);
      this.exploreService.isFollow(this.userId, this.photographerArray[i].id).then(resultMessage => this.setFollowButton(resultMessage));
    }
  }

  setFollowButton(resultMessage: ResultMessage) {
    if (resultMessage.result == "success") {
      this.followButtonContent.push("取消关注");
    } else {
      this.followButtonContent.push("关注");
    }
  }

  follow(followUserId: number, index: number) {
    let content = this.followButtonContent[index];
    if (content == "关注") {
      this.exploreService.follow(followUserId).then(resultMessage => this.checkFollow(resultMessage, index));
    } else {
      this.exploreService.removeFollow(followUserId).then(resultMessage => this.checkRemoveFollow(resultMessage, index));
    }
  }

  checkFollow(resultMessage: ResultMessage, index: number) {
    if (resultMessage.result != "success") {
      alert("关注失败");
    } else {

      alert("关注成功");
      this.followButtonContent[index] = "取消关注";
    }
  }

  checkRemoveFollow(resultMessage: ResultMessage, index: number) {
    if (resultMessage.result != "success") {
      alert("取消关注失败");
    } else {
      alert("取消关注成功");
      this.followButtonContent[index] = "关注";
    }
  }

  gotoHomePage(ownerId) {
    if (ownerId == this.userId) {
      this.router.navigate(['/identify/info', ownerId]);
    } else {
      this.router.navigate(['/identify/homePage', ownerId]);
    }
  }

}
