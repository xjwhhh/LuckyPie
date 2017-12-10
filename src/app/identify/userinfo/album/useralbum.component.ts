import { Component, OnInit, TemplateRef } from '@angular/core';
import { IdentifyService } from 'app/identify/identify.service';
import { Album, ResultMessage, Comment, User } from 'app/entity/entity';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'user-album',
  templateUrl: './useralbum.component.html',
  styleUrls: ['./useralbum.component.css'],
  providers: [{ provide: CarouselConfig, useValue: { interval: false } }]
})
export class UserAlbumComponent implements OnInit {

  albums: Album[] = [];
  selectedAlbum: Album = new Album();

  userId: number;

  user: User;

  comments: Comment[];

  commentUsers: User[] = [];

  replyedCommentUsers: User[] = [];

  commentAreaStyle = [];

  modalRef: BsModalRef;

  constructor(private identifyService: IdentifyService,
    private router: Router,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.userId).then(user => this.user = user);
    this.getUserAlbums(this.userId);
  }

  getUserAlbums(userId: number): void {
    this.identifyService.getUserAlbums(userId).then(albums => this.albums = albums);
  }

  onClickAlbum(albumid: number) {
    this.albums.forEach((album, i) => {
      if (album.id == albumid) {
        this.selectedAlbum = album;
      }
    });
    this.setCurrentStyles();
    this.getAlbumComment();
  }

  getAlbumComment() {
    this.identifyService.getAlbumComment(this.selectedAlbum.id).then(comments => this.getAlbumUser(comments));
  }

  getAlbumUser(comments: Comment[]) {
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

  replyAlbum(comment: string) {
    this.identifyService.doAlbumComment(this.userId, this.userId, this.selectedAlbum.id, comment).then(result => this.check(result));
  }

  showCommentArea(i: number) {
    this.commentAreaStyle[i] = {
      'display': 'block',
      'width': '100%',
      'height': '100%'
    };
  }

  replyComment(userId: number, commentId: number, content: string, i: number) {
    this.identifyService.replyAlbumComment(this.userId, userId, this.selectedAlbum.id, commentId, content).then(result => this.check(result));;
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
      this.getAlbumComment();
    } else {
      alert("评论失败");
    }
  }

  gotoHomePage(ownerId) {
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

  deleteAlbum(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  checkDelete(resultMessage: ResultMessage) {
    if (resultMessage.result == "success") {
      alert("删除相册成功");
      this.closeBigPicture();
      this.getUserAlbums(this.userId);
    } else {
      alert("删除相册失败");
    }
  }

  confirmDelete() {
    this.identifyService.deleteAlbum(this.selectedAlbum.id).then(resultMessage => this.checkDelete(resultMessage));
    this.modalRef.hide();
  }
}
