import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SearchService } from 'app/search/search.service'

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  // styleUrls: ['./share.component.css'],
})
export class SearchComponent implements OnInit {

  userId: number;

  content:string;

  constructor(private route: ActivatedRoute,
  	private searchService:SearchService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });

    let url = location.search;
    let index=url.indexOf("=");
    this.content=url.substr(index+1);
    this.searchService.setUserId(this.userId);
    this.searchService.setContent(this.content);
  }



}
