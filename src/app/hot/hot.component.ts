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


@Component({
  selector: 'hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css'],
})
export class HotComponent implements OnInit {
  shares: Share[];

  thumbUrl = "assets/image/thumb2.png";
  thumb = false;


  constructor(private hotService: HotService) {

  }

  getShares(): void {
    this.hotService.getHotShares().then(shares => this.shares = shares);
  }

  ngOnInit(): void {
    this.getShares();
  }

  ngAfterViewInit(): void {
    // console.log(this.posts[0].id);

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
