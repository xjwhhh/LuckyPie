import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HotService {

  constructor(private http: Http) {
  }

  private getHotSharesUrl = 'http://localhost/LuckyPie-Server/api/get/hotshare';

  getHotShares() {
    this.http.get(this.getHotSharesUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
