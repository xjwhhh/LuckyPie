import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HotService {
  private hotSharesUrl = 'http://localhost:3000/shares';

  constructor(private http: Http) {
  }

  getHotShares(): Promise<Share[]> {
    return this.http.get(this.hotSharesUrl)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
