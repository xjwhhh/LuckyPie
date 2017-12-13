import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {SearchService} from 'app/search/search.service'
import {
  Share,
  User,
  Comment,
  ResultMessage
} from 'app/entity/entity';
import {UtilService} from 'app/util.service';

@Component({
  selector: 'search-share',
  templateUrl: './search_share.component.html',
  styleUrls: ['./search_share.component.css'],
})
export class SearchShareComponent implements OnInit {

  userId: number;

  content: string;

  shareArray: Share[];

  users: User[] = [];

  selectedShare: Share = new Share();

  selectedUser: User = new User();

  user: User;

  comments: Comment[];

  commentUsers: User[] = [];

  replyedCommentUsers: User[] = [];

  commentAreaStyle = [];

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private utilService: UtilService,
              private router: Router) {

  }

  ngOnInit() {
    this.userId = this.searchService.getUserId();
    this.content = this.searchService.getContent();
    this.searchShare();
  }

  searchShare() {
    this.searchService.searchShare(this.content).then(shares => this.setShares(shares));
  }

  setShares(shares: Share[]) {
    this.shareArray = shares;
    for (let i = 0; i < shares.length; i++) {
      this.utilService.getUserBasicInfo(this.shareArray[i].userId).then(user => this.users[i] = user);
    }
  }


  onClickShare(shareId: number) {
    this.shareArray.forEach((share, i) => {
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
    this.utilService.replyShareComment(this.userId, userId, this.selectedShare.id, commentId, content).then(result => this.check(result));
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

  gotoHomePage(ownerId: number) {
    this.router.navigate(['/identify/homePage', ownerId]);
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId + '/tagdetail', tag]);
    this.closeBigPicture();
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
