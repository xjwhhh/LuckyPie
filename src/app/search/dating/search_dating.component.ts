import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {SearchService} from 'app/search/search.service'
import {
  Dating,
  User,
  Comment,
  ResultMessage
} from 'app/entity/entity';
import {UtilService} from 'app/util.service';

@Component({
  selector: 'search-dating',
  templateUrl: './search_dating.component.html',
  styleUrls: ['./search_dating.component.css'],
})
export class SearchDatingComponent implements OnInit {

  userId: number;

  content: string;

  datingArray: Dating[];

  user: User;

  selectedDating: Dating = new Dating();

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private utilService: UtilService,
              private router: Router) {
  }

  ngOnInit() {
    this.userId = this.searchService.getUserId();
    this.content = this.searchService.getContent();
    this.utilService.getUserBasicInfo(this.userId).then(user => this.user = user);
    this.searchDating();
  }

  searchDating() {
    this.searchService.searchDating(this.content).then(datingArray => this.datingArray = datingArray);
  }

  onClickDating(datingId: number) {
    this.datingArray.forEach((dating, i) => {
      if (dating.id == datingId) {
        this.selectedDating = dating;
      }
    });
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
