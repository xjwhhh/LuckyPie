import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SearchService } from 'app/search/search.service'
import { Share } from 'app/entity/entity';

@Component({
  selector: 'search-share',
  templateUrl: './search_share.component.html',
  // styleUrls: ['./share.component.css'],
})
export class SearchShareComponent implements OnInit {

  userId: number;

  content: string;

  shareArray:Share[];

  constructor(private route: ActivatedRoute,
    private searchService: SearchService) {

  }

  ngOnInit() {
    this.userId = this.searchService.getUserId();
    this.content = this.searchService.getContent();
    this.searchShare();
  }

  searchShare() {
    this.searchService.searchShare(this.content).then(shares=>this.shareArray=shares);
  }
}
