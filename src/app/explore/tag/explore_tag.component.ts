import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share,
  Tags
} from 'app/entity/entity';
import {Router, ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'explore-tag',
  templateUrl: './explore_tag.component.html',
  styleUrls: ['./explore_tag.component.css'],
})
export class ExploreTagComponent implements OnInit {


  shares: Share[];

  selectedTag: string;
  selectedArea: string;

  Tags: string[];

  userId: number;

  imageUrls: any[];

  constructor(private exploreService: ExploreService,
              private router: Router,
              private route: ActivatedRoute,
              private  sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.Tags = Tags;
    this.userId = this.exploreService.getUserId();
    this.exploreService.getAllTags().then(imageUrls => this.modifyImages(imageUrls));
  }

  modifyImages(imageUrls: any[]) {
    for (let i = 0; i < imageUrls.length; i++) {
      imageUrls[i] = this.sanitizer.bypassSecurityTrustStyle("url(" + imageUrls[i] + ")");
    }
    this.imageUrls = imageUrls;
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId + '/tagdetail', tag]);
  }

}
