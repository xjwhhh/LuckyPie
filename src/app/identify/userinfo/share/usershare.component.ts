import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Share} from 'app/entity/entity';

@Component({
  selector: 'user-photo',
  templateUrl: './usershare.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserPhotoComponent implements OnInit {

  userId: number;

  shares: Share[];

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    console.log(this.userId);
    this.getUserShares(this.userId);
  }

  getUserShares(userId: number) {
    this.identifyService.getUserShares(userId).then(shares => this.shares = shares);
  }


}
