import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FollowService {
  private followThrendsUrl = 'http://localhost:3000/shares';

  constructor(private http: Http) {
  }

  getFollowShares(): Promise<Share[]> {
    return this.http.get(this.followThrendsUrl)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}