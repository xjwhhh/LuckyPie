import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HotService {

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});


  constructor(private http: Http) {
  }

  private getHotSharesUrl = 'http://localhost/LuckyPie-Server/api/get/hotshare';

  getHotShares(userId: number): Promise<Share[]> {
    let data = new URLSearchParams();
    data.append('userId', userId + "");
    return this.http.post(this.getHotSharesUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
