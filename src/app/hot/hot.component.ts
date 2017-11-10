import {
  Component,
  OnInit
} from '@angular/core';
import {
  HotService
} from './hot.service';
import {
  Share
} from 'app/entity/entity';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';


@Component({
  selector: 'hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css'],
})
export class HotComponent implements OnInit {
  shares: Share[];

  thumbUrl = "assets/image/thumb2.png";
  thumb = false;
 userId: number;

  constructor(private route: ActivatedRoute,private hotService: HotService) {

  }

  

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    // this.getShares();
  }

  ngAfterViewInit(): void {
    // console.log(this.posts[0].id);

  }

  getHotShares(userId:number): void {
    this.hotService.getHotShares(userId);
  }

  doThumb(): void {
    if (this.thumb) {
      this.thumbUrl = "assets/image/thumb2.png";
    } else {
      this.thumbUrl = "assets/image/thumb1.png";
    }
    this.thumb = !this.thumb;

  }
}
