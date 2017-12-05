import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SearchService } from 'app/search/search.service'
import { User } from 'app/entity/entity';

@Component({
  selector: 'search-user',
  templateUrl: './search_user.component.html',
  // styleUrls: ['./share.component.css'],
})
export class SearchUserComponent implements OnInit {
  userId: number;

  content: string;

  userArray:User[];

  constructor(private route: ActivatedRoute,
    private searchService: SearchService) {

  }

  ngOnInit() {
    this.userId = this.searchService.getUserId();
    this.content = this.searchService.getContent();
    this.searchUser();
  }

  searchUser() {
    this.searchService.searchUser(this.content).then(user => this.userArray=user);
  }
}
