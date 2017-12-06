import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';

@Component({
  selector: 'userhomepage',
  templateUrl: './userhomepage.component.html',
  // styleUrls: ['./login.component.css'],
})
export class UserHomePageComponent implements OnInit {

  ownerId: number;

  userId: number;

  owner: User = new User();

  followIdArray: number[];
  followerIdArray: number[];

  followArray: User[] = [];

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.ownerId = +params['id'];
    });
    this.userId = this.identifyService.getUserId();
    this.getUserBasicInfo(this.ownerId);
    this.identifyService.setOwnerId(this.ownerId);

  }

  getUserBasicInfo(ownerId: number) {
    this.identifyService.getUserBasicInfo(ownerId).then(user => {
      this.owner = user;
    });
    this.identifyService.getUserFollows(ownerId).then(userIdArray => this.followIdArray = userIdArray);
    this.identifyService.getUserFollowers(ownerId).then(userIdArray => this.followerIdArray = userIdArray);
  }


  startChatting() {
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


}
