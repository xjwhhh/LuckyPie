import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';

@Component({
  selector: 'user-photo',
  templateUrl: './usershare.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserPhotoComponent implements OnInit {

  userId: number;

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    console.log(this.userId);
  }

  getUserShares(userId: number) {
    this.identifyService.getUserShares(userId);
  }


}
