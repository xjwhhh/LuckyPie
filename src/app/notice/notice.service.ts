import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Notice, User, Share, ResultMessage, Album} from 'app/entity/entity';

@Injectable()
export class NoticeService {

  userId: number;

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  private userBasciInfoUrl = 'http://localhost/LuckyPie-Server/api/get/user/basicinfo/';

  getUserBasicInfo(userId: number): Promise<User> {
    return this.http.get(this.userBasciInfoUrl + userId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private shareInfoUrl = 'http://localhost/LuckyPie-Server/api/get/shareByShareId/';

  getShareByShareId(shareId: number): Promise<Share> {
    return this.http.get(this.shareInfoUrl + shareId)
      .toPromise()
      .then(response => response.json() as Share)
      .catch(this.handleError);
  }

  private albumInfoUrl = 'http://localhost/LuckyPie-Server/api/get/albumByAlbumId/';

  getAlbumByAlbumId(albumId: number): Promise<Album> {
    return this.http.get(this.albumInfoUrl + albumId)
      .toPromise()
      .then(response => response.json() as Album)
      .catch(this.handleError);
  }

  private getNoticeUrl = 'http://localhost/LuckyPie-Server/api/post/notice';

  getNotice(userId: number) {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    return this.http.post(this.getNoticeUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private getNewThumbNoticeUrl = 'http://localhost/LuckyPie-Server/api/post/thumbNotice/new';

  getNewThumbNotice(userId: number): Promise<Notice[]> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    return this.http.post(this.getNewThumbNoticeUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Notice[])
      .catch(this.handleError);
  }

  private getNewCommentNoticeUrl = 'http://localhost/LuckyPie-Server/api/post/commentNotice/new';

  getNewCommentNotice(userId: number): Promise<Notice[]> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    return this.http.post(this.getNewCommentNoticeUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Notice[])
      .catch(this.handleError);
  }

  private getOldThumbNoticeUrl = 'http://localhost/LuckyPie-Server/api/post/thumbNotice/old';

  getOldThumbNotice(userId: number): Promise<Notice[]> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    return this.http.post(this.getOldThumbNoticeUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Notice[])
      .catch(this.handleError);
  }

  private getOldCommentNoticeUrl = 'http://localhost/LuckyPie-Server/api/post/commentNotice/old';

  getOldCommentNotice(userId: number): Promise<Notice[]> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    return this.http.post(this.getOldCommentNoticeUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Notice[])
      .catch(this.handleError);
  }

  private setAllIsReadTrueUrl = 'http://localhost/LuckyPie-Server/api/post/notice/setAllIsReadTrue';

  setAllIsReadTrue(noticeIdArray: string): Promise<ResultMessage> {
    let data = new URLSearchParams();
    data.append("noticeIdArray", noticeIdArray);
    return this.http.post(this.setAllIsReadTrueUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }
}
