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
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
  providers: [FollowService]
})

export class FollowComponent implements OnInit {

  shares: Share[];

  thumbUrl = [];
  thumb = [];
  userId: number = -1;


  constructor(private route: ActivatedRoute, private followService: FollowService, private router: Router, private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
      console.log(params);
    });
    console.log(this.userId);
    // this.test();
    this.getFollowShares(this.userId);
  }


  ngAfterViewInit(): void {

  }

  getFollowShares(userId: number): void {
    this.followService.getFollowShares(userId).then(shares => this.setShares(shares));
  }

  setShares(shares: Share[]) {
    // for (let i = 0; i < shares.length; i++) {
    //   let share = shares[i];
    //   for (let j = 0; j < share.imageUrls.length; j++) {
    //     // let temp="http://localhost/LuckyPie-Server/photo/20171114/15106508520.jpeg";
    //     let temp=share.imageUrls[j];
    //     share.imageUrls[j] = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    //   }
    //   shares[i] = share;
    // }
    this.shares = shares;
    for (let i = 0; i < shares.length; i++) {
      this.thumbUrl.push("assets/image/thumb2.png");
      this.thumb.push(false);
    }
  }

  doThumb(i: number, shareId: number): void {
    if (this.thumb[i]) {
      this.thumbUrl[i] = "assets/image/thumb2.png";
      this.followService.cancelThumb(this.userId, shareId);
    } else {
      this.thumbUrl[i] = "assets/image/thumb1.png";
      this.followService.doThumb(this.userId, shareId);
    }
    this.thumb[i] = !this.thumb[i];
    console.log(i);
    console.log(shareId);

  }

  test(): void {
    this.shares = [new Share(), new Share()];
  }


}
