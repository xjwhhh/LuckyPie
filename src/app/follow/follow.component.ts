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
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';

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
  userId: number = -1;


  constructor(private route: ActivatedRoute, private followService: FollowService, private router: Router) {

  }


  ngOnInit(): void {
    // console.log(this.userId);
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
      console.log(params);
    });
    console.log(this.userId);
    this.test();
  }


  ngAfterViewInit(): void {

  }

  getShares(userId: number): void {
    this.followService.getFollowShares(userId);
  }

  doThumb(): void {
    if (this.thumb) {
      this.thumbUrl = "assets/image/thumb2.png";
    } else {
      this.thumbUrl = "assets/image/thumb1.png";
    }
    this.thumb = !this.thumb;

  }

  test(): void {
    this.shares = [new Share(), new Share()];
  }


}
