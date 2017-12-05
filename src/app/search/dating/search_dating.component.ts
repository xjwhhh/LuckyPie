import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SearchService } from 'app/search/search.service'
import { Dating } from 'app/entity/entity';

@Component({
  selector: 'search-dating',
  templateUrl: './search_dating.component.html',
  // styleUrls: ['./share.component.css'],
})
export class SearchDatingComponent implements OnInit {

  userId: number;

  content: string;

  datingArray: Dating[];

  constructor(private route: ActivatedRoute,
    private searchService: SearchService) {

  }

  ngOnInit() {
    this.userId = this.searchService.getUserId();
    this.content = this.searchService.getContent();
    this.searchDating();
  }

  searchDating() {
    this.searchService.searchDating(this.content).then(datings => this.datingArray = datings);
    console.log("erty");
  }

}
