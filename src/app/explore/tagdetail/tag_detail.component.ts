import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share,
  User,
  Comment
} from 'app/entity/entity';
import {UtilService} from 'app/util.service';

@Component({
  selector: 'explore-tag-detail',
  templateUrl: './tag_detail.component.html',
  // styleUrls: ['./explore_model.component.css'],
})
export class ExploreTagDetailComponent implements OnInit {
  userId: number;
  shares: Share[];
  selectedTag: string;

  selectedShare: Share = new Share();

  selectedUser: User = new User();

  user: User;

  users: User[] = [];

  comments: Comment[];

  commentUsers: User[] = [];

  replyedCommentUsers: User[] = [];

  commentAreaStyle = [];


  constructor(private route: ActivatedRoute, private router: Router,
              private utilService: UtilService, private exploreService: ExploreService) {
  }

  ngOnInit(): void {
    this.getShares();
  }

  getShares() {
    this.route.params.forEach((params: Params) => {
      if (params['selectedTag'] !== undefined) {
        this.selectedTag = params['selectedTag'];
        this.exploreService.getSharesByTag(this.selectedTag).then(shares => console.log(shares));
      }
    });
  }


}
