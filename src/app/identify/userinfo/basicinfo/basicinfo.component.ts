import {Component, OnInit} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Component({
  selector: 'user-basicinfo',
  templateUrl: './basicinfo.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserBasicInfoComponent implements OnInit {

  user: User = new User();
  userId: number;


  constructor(private router: Router, private identifyService: IdentifyService) {
  }

  ngOnInit(): void {
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.userId).then(user => this.user = user);
  }

  gotoEditInfo() {
    this.router.navigate(['/identify/info/' + this.userId + '/editinfo'], {queryParams: {name: this.user.name}});
  }

  exit() {
    this.identifyService.setUserId(-1);
    this.router.navigate(['/identify/login']);
  }
}
