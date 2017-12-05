import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Dating, User} from 'app/entity/entity';

@Component({
  selector: 'show-activity',
  templateUrl: './showdate.component.html',
  styleUrls: ['./userdate.component.css'],
})
export class ShowActivityComponent implements OnInit {
  userId: number;

  datings: Dating[];
  user: User;
  selectedDating: Dating = new Dating();

  ownerId: number;


  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.ownerId = this.identifyService.getOwnerId();
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.ownerId).then(user => this.user = user);
    console.log(this.userId);
    this.getUserDating(this.ownerId);
  }

  getUserDating(userId: number) {
    this.identifyService.getUserDating(userId).then(datings => this.datings = datings);
  }

  onClickDating(datingId: number) {
    this.datings.forEach((dating, i) => {
      if (dating.id == datingId) {
        this.selectedDating = dating;
      }
    });
    console.log(this.selectedDating);
    this.setCurrentStyles();
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId +
    '/tagdetail', tag
    ]);
  }

  currentStyles = {
    'width': '0',
    'height': '0',
    'opacity': '1',
    'background-color': '#000',
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'z-index': '-1',
    'display': 'none'
  };

  setCurrentStyles() {
    this.currentStyles = {
      'width': '100%',
      'height': '100%',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '1000',
      'display': 'block'
    };
    console.log("success");
  }

  closeBigPicture() {
    this.currentStyles = {
      'width': '0',
      'height': '0',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '-1',
      'display': 'none'
    };
  }

  fixheight = window.outerHeight;

}
