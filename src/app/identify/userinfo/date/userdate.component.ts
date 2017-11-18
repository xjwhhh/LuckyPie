import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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

  selectedDating: Dating = new Dating();

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    console.log(this.userId);
    this.getUserDating(this.userId);
  }

  getUserDating(userId: number) {
    this.identifyService.getUserDating(userId).then(datings => this.datings = datings);
  }

  onClickShare(datingId: number) {
    this.datings.forEach((dating, i) => {
      if (dating.id == datingId) {
        this.selectedDating = dating;
      }
    });
    this.setCurrentStyles();
    // this.getShareComment();
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
