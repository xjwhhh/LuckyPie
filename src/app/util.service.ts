import { Injectable } from '@angular/core';
import { Share, User, Comment, ResultMessage } from 'app/entity/entity';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UtilService {

  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {}

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private doThumbUrl = 'http://localhost/LuckyPie-Server/api/post/share/doThumb';

  doThumb(startUserId: number, userId: number, shareId: number) {
    let data = new URLSearchParams();
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("shareId", shareId + "");
    this.http.post(this.doThumbUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private cancelThumbUrl = 'http://localhost/LuckyPie-Server/api/post/share/cancelThumb';

  cancelThumb(startUserId: number, userId: number, shareId: number) {
    let data = new URLSearchParams();
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("shareId", shareId + "");
    this.http.post(this.cancelThumbUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private userBasciInfoUrl = 'http://localhost/LuckyPie-Server/api/get/user/basicinfo/';

  getUserBasicInfo(userId: number): Promise < User > {
    return this.http.get(this.userBasciInfoUrl + userId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private getShareCommentUrl = 'http://localhost/LuckyPie-Server/api/post/share/comment';

  getShareComment(shareId: number): Promise < Comment[] > {
    let data = new URLSearchParams();
    data.append("shareId", shareId + "");
    return this.http.post(this.getShareCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Comment[])
      .catch(this.handleError);

  }


  private getAlbumCommentUrl = 'http://localhost/LuckyPie-Server/api/post/album/comment';

  getAlbumComment(albumId: number): Promise < Comment[] > {
    let data = new URLSearchParams();
    data.append("albumId", albumId + "");
    return this.http.post(this.getAlbumCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Comment[])
      .catch(this.handleError);

  }

  private doShareCommentUrl = 'http://localhost/LuckyPie-Server/api/post/share/doComment';


  doShareComment(startUserId: number, userId: number, shareId: number, comment: string): Promise < ResultMessage > {
    let data = new URLSearchParams();
    console.log(startUserId);
    console.log(userId);
    console.log(shareId);
    console.log(comment);
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("replyShareId", shareId + "");
    data.append("replyCommentId", "");
    data.append("content", comment);
    return this.http.post(this.doShareCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

  replyShareComment(startUserId: number, userId: number, shareId: number, commentId: number, content: string): Promise < ResultMessage > {
    let data = new URLSearchParams();
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("replyShareId", shareId + "");
    data.append("replyCommentId", commentId + "");
    data.append("content", content);
    return this.http.post(this.doShareCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

  private doAlbumCommentUrl = 'http://localhost/LuckyPie-Server/api/post/album/doComment';

  doAlbumComment(startUserId: number, userId: number, albumId: number, comment: string): Promise < ResultMessage > {
    let data = new URLSearchParams();
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("replyAlbumId", albumId + "");
    data.append("replyCommentId", "");
    data.append("content", comment);
    return this.http.post(this.doAlbumCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

  replyAlbumComment(startUserId: number, userId: number, albumId: number, commentId: number, content: string): Promise < ResultMessage > {
    let data = new URLSearchParams();
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("replyAlbumId", albumId + "");
    data.append("replyCommentId", commentId + "");
    data.append("content", content);
    return this.http.post(this.doAlbumCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

}
