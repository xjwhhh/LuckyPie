import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IdentifyService} from 'app/identify/identify.service';
import {Share, User, ResultMessage, Comment} from 'app/entity/entity';

@Component({
  selector: 'user-photo',
  templateUrl: './usershare.component.html',
  styleUrls: ['./usershare.component.css'],
})
export class UserPhotoComponent implements OnInit {

  userId: number;

  shares: Share[];

  selectedShare: Share = new Share();

  user: User;

  comments: Comment[];

  commentUsers: User[] = [];

  replyedCommentUsers: User[] = [];

  commentAreaStyle = [];

  constructor(private identifyService: IdentifyService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.userId).then(user => this.user = user);
    this.getUserShares(this.userId);
  }

  getUserShares(userId: number) {
    this.identifyService.getUserShares(userId).then(shares => this.shares = shares);
  }

  onClickShare(shareId: number) {
    this.shares.forEach((share, i) => {
      if (share.id == shareId) {
        this.selectedShare = share;
      }
    });
    this.setCurrentStyles();
    this.getShareComment();
  }

  getShareComment() {
    this.identifyService.getShareComment(this.selectedShare.id).then(comments => this.getCommentUser(comments));
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
      this.identifyService.getUserBasicInfo(comments[i].userId).then(user => this.commentUsers.push(user));
      if (comments[i].replyCommentId != null) {
        for (let j = 0; j < i; j++) {
          if (comments[j].id == comments[i].replyCommentId) {
            this.identifyService.getUserBasicInfo(comments[j].userId).then(user => this.replyedCommentUsers[i] = user);
          }
        }
      } else {
        this.replyedCommentUsers[i] = new User();
      }
    }
    this.comments = comments;
  }

  replyShare(comment: string) {
    this.identifyService.doShareComment(this.userId, this.userId, this.selectedShare.id, comment).then(result => this.check(result));
  }

  showCommentArea(i: number) {
    this.commentAreaStyle[i] = {
      'display': 'block',
      'width': '100%',
      'height': '100%'
    };
  }

  replyComment(userId: number, commentId: number, content: string, i: number) {
    this.identifyService.replyShareComment(this.userId, userId, this.selectedShare.id, commentId, content).then(result => this.check(result));
    ;
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

  getoHomePage(ownerId) {
    if (ownerId == this.userId) {
      this.router.navigate(['/identify/info', ownerId]);
    } else {
      this.router.navigate(['/identify/homePage', ownerId]);
    }
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
    console.log("success");
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
