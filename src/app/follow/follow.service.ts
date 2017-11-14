import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
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
  getFollowShares(userId: number):Promise<Share[]> {
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


}
