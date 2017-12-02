import {Injectable} from '@angular/core';
import {Share, User, ResultMessage, Comment} from 'app/entity/entity';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FollowService {

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private getFollowSharesUrl = 'http://localhost/LuckyPie-Server/api/post/follow/share'

  getFollowShares(userId: number): Promise<Share[]> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    return this.http.post(this.getFollowSharesUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private getFollowDatingUrl = 'http://localhost/LuckyPie-Server/api/post/follow/dating'

  getFollowDating(userId: number) {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    this.http.post(this.getFollowDatingUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private doThumbUrl = 'http://localhost/LuckyPie-Server/api/post/share/doThumb';

  doThumb(startUserId: number, userId: number, shareId: number) {
    let data = new URLSearchParams();
    data.append("startUserId", startUserId + "");
    data.append("userId", userId + "");
    data.append("shareId", shareId + "");
    console.log(data);
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

  getUserBasicInfo(userId: number): Promise<User> {
    return this.http.get(this.userBasciInfoUrl + userId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private getShareCommentUrl = 'http://localhost/LuckyPie-Server/api/post/share/comment';

  getShareComment(shareId: number): Promise<Comment[]> {
    let data = new URLSearchParams();
    data.append("shareId", shareId + "");
    return this.http.post(this.getShareCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Comment[])
      .catch(this.handleError);

  }

  private doShareCommentUrl = 'http://localhost/LuckyPie-Server/api/post/share/doComment';

  doShareComment(userId: number, shareId: number, comment: string): Promise<ResultMessage> {
    console.log(userId);
    console.log(shareId);
    console.log(comment);
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    data.append("replyShareId", shareId + "");
    data.append("replyCommentId", "");
    data.append("content", comment);
    return this.http.post(this.doShareCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

  replyComment(userId: number, shareId: number, commentId: number, content: string): Promise<ResultMessage> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    data.append("replyShareId", shareId + "");
    data.append("replyCommentId", commentId + "");
    data.append("content", content);
    return this.http.post(this.doShareCommentUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }


}
