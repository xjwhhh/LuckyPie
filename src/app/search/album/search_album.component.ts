import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SearchService } from 'app/search/search.service'
import { Album } from 'app/entity/entity';

@Component({
  selector: 'search-album',
  templateUrl: './search_album.component.html',
  // styleUrls: ['./share.component.css'],
})
export class SearchAlbumComponent implements OnInit {

  userId: number;

  content: string;

  albumArray:Album[];

  constructor(private route: ActivatedRoute,
    private searchService: SearchService) {

  }

  ngOnInit() {
    this.userId = this.searchService.getUserId();
    this.content = this.searchService.getContent();
    this.searchAlbum();
  }

  searchAlbum() {
    this.searchService.searchAlbum(this.content).then(albums=>this.albumArray=albums);
  }
}
