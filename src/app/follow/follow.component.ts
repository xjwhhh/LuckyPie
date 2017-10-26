import {
  Component,
  OnInit
} from '@angular/core';
import {
  FollowService
} from './follow.service';
import {
  Share
} from 'app/entity/entity';

@Component({
  selector: 'follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
  providers: [FollowService]
})

export class FollowComponent implements OnInit {

  shares: Share[];

  thumbUrl = "assets/image/thumb2.png";
  thumb = false;


  constructor(private followService: FollowService) {

  }

  getShares(): void {
    this.followService.getFollowShares().then(shares => this.shares = shares);
  }

  ngOnInit(): void {
    this.getShares();
  }

  ngAfterViewInit(): void {

  }

  doThumb(): void {
    if (this.thumb) {
      this.thumbUrl = "assets/image/thumb2.png";
    }
    else {
      this.thumbUrl = "assets/image/thumb1.png";
    }
    this.thumb = !this.thumb;

  }

  test(): void {
    this.shares = [new Share(), new Share()];
  }


}
