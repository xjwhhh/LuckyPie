import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share,
  Tags
} from 'app/entity/entity';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'explore-tag',
  templateUrl: './explore_tag.component.html',
  // styleUrls: ['./explore_photo.component.css'],
})
export class ExploreTagComponent implements OnInit {


  shares: Share[];

  selectedTag: string;
  selectedArea: string;

  Tags: string[];

  userId: number;

  imageUrls: string[];

  constructor(private exploreService: ExploreService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.Tags = Tags;
    this.userId = this.exploreService.getUserId();
    this.exploreService.getAllTags().then(imageUrls => this.imageUrls = imageUrls);
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId + '/tagdetail', tag]);
    console.log(tag);
    console.log("4567uio");
  }

}
