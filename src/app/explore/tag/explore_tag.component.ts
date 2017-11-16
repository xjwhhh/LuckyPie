import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share
} from 'app/entity/entity';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'explore-tag',
  templateUrl: './explore_tag.component.html',
  // styleUrls: ['./explore_photo.component.css'],
})
export class ExploreTagComponent implements OnInit {


  shares: Share[];

  selectedTag: string;
  selectedArea: string;

  userId:number;

  constructor(private exploreService: ExploreService, private router: Router,private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId=this.exploreService.getUserId();
    this.getShares();
  }


  getShares(): void {
    this.exploreService.getShares().then(shares => this.shares = shares);
  }

  selectTag(): void {
    //此处应有参数——选择的标签名
    this.selectedTag = "生活";
    this.exploreService.setSelectedTag(this.selectedTag);
    this.gotoTagDetail();
  }

  gotoTagDetail(): void {
    this.router.navigate(['/explore/'+this.userId+'/tagdetail', this.selectedTag]);
  }

  showAllTags(): void {
    this.selectedArea = "Style";
    this.router.navigate(['/explore/'+this.userId+'/showalltags', this.selectedArea]);
  }
}
