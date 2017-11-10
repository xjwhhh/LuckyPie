import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {Location} from '@angular/common';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';

@Component({
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  // styleUrls: ['./login.component.css'],
})
export class UserInfoComponent implements OnInit {

  userId: number;

  user: User;

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    this.getUserBasicInfo(this.userId);
  }

  getUserBasicInfo(userId: number) {
    console.log(userId);
    this.identifyService.getUserBasicInfo(userId).then(user => this.user=user);

  }


}
