import {Component, OnInit} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Component({
  selector: 'show-basicinfo',
  templateUrl: './showbasicinfo.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class ShowBasicInfoComponent implements OnInit {

  user: User = new User();
  ownerId: number;


  constructor(private router: Router, private identifyService: IdentifyService) {
  }

  ngOnInit(): void {
    this.ownerId = this.identifyService.getOwnerId();
    this.identifyService.getUserBasicInfo(this.ownerId).then(user => this.user = user);
  }

}
