import {
  Component,
  OnInit
} from '@angular/core';
import {
  FollowService
} from '../follow.service';
import {
  Share,
  User,
  ResultMessage,
  Comment
} from 'app/entity/entity';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { UtilService } from 'app/util.service';

@Component({
  selector: 'follow-big',
  templateUrl: './follow_big.component.html',
  styleUrls: ['./follow_big.component.css'],
})

export class FollowBigComponent implements OnInit {

  shares: Share[] = [];

  users: User[] = [];

  thumbUrl = [];
  thumb = [];
  userId: number;

  selectedShare: Share = new Share();

  selectedUser: User = new User();

  user: User;

  comments: Comment[];

  commentUsers: User[] = [];

  replyedCommentUsers: User[] = [];

  commentAreaStyle = [];


  constructor(private route: ActivatedRoute,
    private followService: FollowService,
    private router: Router,
    private utilService: UtilService) {

  }


  ngOnInit(): void {
    this.userId = this.followService.getUserId();
    this.getFollowShares(this.userId);
  }


  ngAfterViewInit(): void {

  }

  getFollowShares(userId: number): void {
    this.followService.getFollowShares(userId).then(shares => this.setShares(shares));
  }

  setShares(shares: Share[]) {
    for (let i = shares.length - 1; i >= 0; i--) {
      this.shares.push(shares[i]);
    }
    for (let i = 0; i < this.shares.length; i++) {
      if (this.shares[i].thumb == 1) {
        this.thumbUrl.push("assets/image/thumb1.png");
        this.thumb.push(true);
      } else {
        this.thumbUrl.push("assets/image/thumb2.png");
        this.thumb.push(false);
      }
      this.utilService.getUserBasicInfo(this.shares[i].userId).then(user => this.users[i] = user);
    }
  }

  doThumb(i: number, userId: number, shareId: number): void {
    if (this.thumb[i]) {
      this.thumbUrl[i] = "assets/image/thumb2.png";
      this.utilService.cancelThumb(this.userId, userId, shareId);
    } else {
      this.thumbUrl[i] = "assets/image/thumb1.png";
      this.utilService.doThumb(this.userId, userId, shareId);
    }
    this.thumb[i] = !this.thumb[i];

  }

  onClickShare(shareId: number) {
    this.shares.forEach((share, i) => {
      if (share.id == shareId) {
        this.selectedShare = share;
      }
    });
    this.utilService.getUserBasicInfo(this.selectedShare.userId).then(user => this.selectedUser = user);
    this.setCurrentStyles();
    this.getShareComment();
  }

  getShareComment() {
    this.utilService.getShareComment(this.selectedShare.id).then(comments => this.getCommentUser(comments));
  }

  getCommentUser(comments: Comment[]) {
    for (let i = 0; i < comments.length; i++) {
      this.commentAreaStyle.push({
        'display': 'none',
        'width': '0',
        'height': '0'
      });
    }
    for (let i = 0; i < comments.length; i++) {
      this.utilService.getUserBasicInfo(comments[i].userId).then(user => this.commentUsers.push(user));
      if (comments[i].replyCommentId != null) {
        for (let j = 0; j < i; j++) {
          if (comments[j].id == comments[i].replyCommentId) {
            this.utilService.getUserBasicInfo(comments[j].userId).then(user => this.replyedCommentUsers[i] = user);
          }
        }
      } else {
        this.replyedCommentUsers[i] = new User();
      }
    }
    this.comments = comments;
  }

  replyShare(userId: number, comment: string) {
    this.utilService.doShareComment(this.userId, userId, this.selectedShare.id, comment).then(result => this.check(result));
  }

  showCommentArea(i: number) {
    this.commentAreaStyle[i] = {
      'display': 'block',
      'width': '100%',
      'height': '100%'
    };
  }

  replyComment(userId: number, commentId: number, content: string, i: number) {
    this.utilService.replyShareComment(this.userId, userId, this.selectedShare.id, commentId, content).then(result => this.check(result));;
    this.commentAreaStyle[i] = {
      'display': 'none',
      'width': '100%',
      'height': '100%'
    };
  }

  cancelComment(i: number) {
    this.commentAreaStyle[i] = {
      'display': 'none',
      'width': '100%',
      'height': '100%'
    };
  }


  check(resultMessage: ResultMessage) {
    if (resultMessage.result == "success") {
      alert("评论成功");
      this.getShareComment();
    } else {
      alert("评论失败");
    }
  }

  gotoHomePage(ownerId: number) {
    this.router.navigate(['/identify/homePage', ownerId]);
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId + '/tagdetail', tag]);
  }

  currentStyles = {
    'width': '0',
    'height': '0',
    'opacity': '1',
    'background-color': '#000',
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'z-index': '-1',
    'display': 'none'
  };

  setCurrentStyles() {
    this.currentStyles = {
      'width': '100%',
      'height': '100%',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '1000',
      'display': 'block'
    };
  }

  closeBigPicture() {
    this.currentStyles = {
      'width': '0',
      'height': '0',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '-1',
      'display': 'none'
    };
  }

  fixheight = window.outerHeight;


}
