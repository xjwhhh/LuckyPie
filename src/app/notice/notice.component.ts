import {
  Component,
  OnInit
} from '@angular/core';
import {
  NoticeService
} from './notice.service';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';


@Component({
  selector: 'notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  // providers:[NoticeService]
})
export class NoticeComponent {
  userId: number;

  constructor(private route: ActivatedRoute, private noticeService: NoticeService) {

  }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    console.log(this.userId);
  }

  getNotice(userId: number) {
    this.noticeService.getNotice(userId);
  }


}
