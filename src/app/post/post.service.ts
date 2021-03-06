import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Addresses, CostTypes, Tags, Share, Album, Dating, User} from 'app/entity/entity';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class PostService {
  userId: number = -1;

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private router: Router) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  dateFormat(fmt, date) { //author: meizz
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  getAddresses(): Promise<string[]> {
    return Promise.resolve(Addresses);
  }

  getCostTypes(): Promise<string[]> {
    return Promise.resolve(CostTypes);
  }

  getTags(): Promise<string[]> {
    return Promise.resolve(Tags);
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  private uploadDateUrl = 'http://localhost/LuckyPie-Server/api/post/post/dating/upload';

  uploadDating(datingInfo: string): Promise<Dating> {
    let data = new URLSearchParams();
    data.append("datingInfo", datingInfo);
    return this.http.post(this.uploadDateUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Dating)
      .catch(this.handleError);
  }

  private uploadAlbumUrl = 'http://localhost/LuckyPie-Server/api/post/post/album/upload';

  uploadAlbum(albumInfo: string): Promise<Album> {
    let data = new URLSearchParams();
    data.append("albumInfo", albumInfo);
    return this.http.post(this.uploadAlbumUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Album)
      .catch(this.handleError);
  }

  private uploadShareUrl = 'http://localhost/LuckyPie-Server/api/post/post/share/upload';

  uploadShare(shareInfo: string): Promise<Share> {
    let data = new URLSearchParams();
    data.append("shareInfo", shareInfo);
    return this.http.post(this.uploadShareUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Share)
      .catch(this.handleError);
  }

  private getUserFollowsUrl = 'http://localhost/LuckyPie-Server/api/get/follow/';

  getUserFollows(userId: number): Promise<number[]> {
    return this.http.get(this.getUserFollowsUrl + userId)
      .toPromise()
      .then(response => response.json() as number[])
      .catch(this.handleError);
  }

  private getUserFollowersUrl = 'http://localhost/LuckyPie-Server/api/get/follower/';

  getUserFollowers(userId: number): Promise<number[]> {
    return this.http.get(this.getUserFollowersUrl + userId)
      .toPromise()
      .then(response => response.json() as number[])
      .catch(this.handleError);
  }

  private userBasciInfoUrl = 'http://localhost/LuckyPie-Server/api/get/user/basicinfo/';

  getUserBasicInfo(userId: number): Promise<User> {
    return this.http.get(this.userBasciInfoUrl + userId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  //   private doAtUrl = 'http://localhost/LuckyPie-Server/api/post/share/doAt';

  // doAt(startUserId: number, userId: number, shareId: number) {
  //   let data = new URLSearchParams();
  //   data.append("startUserId", startUserId + "");
  //   data.append("userId", userId + "");
  //   data.append("shareId", shareId + "");
  //   this.http.post(this.doAtUrl, data, this.options)
  //     .toPromise()
  //     .then(response => console.log(response))
  //     .catch(this.handleError);
  // }


}
