import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share
} from 'app/entity/entity';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'explore-all-tags',
  templateUrl: './all_tags.component.html',
  // styleUrls: ['./explore_date.component.css'],
})
export class ExploreShowAllTagsComponent implements OnInit {

  alltags: string[];
  shares: Share[];
  selectedArea: string;
  selectedTag: string;

  constructor(private route: ActivatedRoute, private exploreService: ExploreService, private router: Router) {
  }

  ngOnInit(): void {
    // console.log("4567867890-");
    this.getAllTags();

  }

  getAllTags() {
    this.route.params.forEach((params: Params) => {
      if (params['selectedArea'] !== undefined) {
        let selectedArea = params['selectedArea'];
        this.exploreService.getAllTags(selectedArea).then(shares => this.shares = shares);
      }
    });
  }

  selectTag(): void {
    //此处应有参数——选择的标签名
    this.selectedTag = "生活";
    this.exploreService.setSelectedTag(this.selectedTag);
    this.gotoTagDetail();
  }

  gotoTagDetail(): void {
    this.router.navigate(['/explore/tagdetail', this.selectedTag]);
  }
}
