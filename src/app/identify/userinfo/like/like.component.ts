import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Share, User} from 'app/entity/entity';

@Component({
  selector: 'user-like',
  templateUrl: './like.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserLikeComponent implements OnInit {
  userId: number;

  shares: Share[];

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    console.log(this.userId);
    this.getUserLikes(this.userId);
  }

  getUserLikes(userId: number) {
    this.identifyService.getUserLikes(userId).then(shares => this.shares = shares);
  }
}
