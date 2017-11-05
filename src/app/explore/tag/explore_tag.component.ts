import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share
} from 'app/entity/entity';
import {Router} from '@angular/router';

@Component({
  selector: 'explore-tag',
  templateUrl: './explore_tag.component.html',
  // styleUrls: ['./explore_photo.component.css'],
})
export class ExploreTagComponent implements OnInit {


  shares: Share[];

  selectedTag: string;
  selectedArea: string;

  getShares(): void {
    this.exploreService.getShares().then(shares => this.shares = shares);
  }

  constructor(private exploreService: ExploreService, private router: Router,) {
  }

  ngOnInit(): void {
    this.getShares();
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

  showAllTags(): void {
    this.selectedArea = "Style";
    this.router.navigate(['/explore/showalltags', this.selectedArea]);
  }
}
