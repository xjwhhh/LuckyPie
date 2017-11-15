import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Dating, User} from 'app/entity/entity';

@Component({
  selector: 'user-activity',
  templateUrl: './userdate.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserActivityComponent implements OnInit {
  userId: number;

  datings: Dating[];

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    console.log(this.userId);
    this.getUserDating(this.userId);
  }

  getUserDating(userId: number) {
    this.identifyService.getUserDating(userId).then(datings => this.datings = datings);
  }

}
