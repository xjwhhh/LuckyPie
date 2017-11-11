import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {PostService} from 'app/post/post.service';


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  // providers:[HotService]
})
export class PostComponent implements OnInit {

  userId: number;

  constructor(private route: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    this.postService.setUserId(this.userId);

  }

  ngAfterViewInit(): void {

  }


}
