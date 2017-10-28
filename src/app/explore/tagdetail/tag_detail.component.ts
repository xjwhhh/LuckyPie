import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share
} from 'app/entity/entity';
import {Location} from '@angular/common'

@Component({
  selector: 'explore-tag-detail',
  templateUrl: './tag_detail.component.html',
  // styleUrls: ['./explore_model.component.css'],
})
export class ExploreTagDetailComponent implements OnInit {
  shares: Share[];
  selectedTag: String;
  type: String;//最新或热门
  constructor(private route: ActivatedRoute, private exploreService: ExploreService) {
  }

  ngOnInit(): void {
    this.getShares();
  }

  getShares() {
    this.route.params.forEach((params: Params) => {
      if (params['selectedTag'] !== undefined) {
        let selectedTag = params['selectedTag'];
        this.exploreService.getSharesByTag(selectedTag).then(shares => this.shares = shares);
      }
    });
  }

//选择热门分享
  selectHotShares() {
    console.log("hot");
  }

//选择最新分享
  selectNewShares() {
    console.log("new");
  }


}
