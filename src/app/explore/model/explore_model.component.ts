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
  selector: 'explore-model',
  templateUrl: './explore_model.component.html',
  styleUrls: ['./explore_model.component.css'],
})
export class ExploreModelComponent implements OnInit {

  modelArray: User[];

  selectedShare: Share = new Share();

  userId: number;

  followButtonContent = [];

  labelStyles = [{'background-color': 'white'}, {'background-color': 'white'}, {'background-color': 'white'}];

  constructor(private exploreService: ExploreService, private router: Router) {
  }

  ngOnInit(): void {
    this.userId = this.exploreService.getUserId();
    this.selectHotModels();
  }

  selectHotModels() {
    this.resetLabelStyles();
    this.labelStyles[0] = {'background-color': '#97cbff'};
    this.exploreService.getHotModel().then(users => this.setModels(users));
  }

  selectBestModels() {
    this.resetLabelStyles();
    this.labelStyles[1] = {'background-color': '#97cbff'};
    this.exploreService.getBestModel().then(users => this.setModels(users));
  }

  selectNewModels() {
    this.resetLabelStyles();
    this.labelStyles[2] = {'background-color': '#97cbff'};
    this.exploreService.getNewModel().then(users => this.setModels(users));
  }


  setModels(users: User[]) {
    this.followButtonContent.splice(0, this.followButtonContent.length);
    this.modelArray = users;
    for (let i = 0; i < this.modelArray.length; i++) {
      this.exploreService.getUserShares(this.modelArray[i].id).then(shares => this.modelArray[i].shares = shares);
      this.exploreService.isFollow(this.userId, this.modelArray[i].id).then(resultMessage => this.setFollowButton(resultMessage));
    }
  }

  resetLabelStyles() {
    this.labelStyles = [{'background-color': 'white'}, {'background-color': 'white'}, {'background-color': 'white'}];
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
