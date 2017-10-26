import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Addresses, CostTypes, Identifies, Genders} from 'app/entity/entity';

@Injectable()
export class ExploreService {
  constructor(private http: Http) {
  }

  getAddresses(): Promise<String[]> {
    return Promise.resolve(Addresses);
  }

  getCostTypes(): Promise<String[]> {
    return Promise.resolve(CostTypes);
  }

  getIdentifies(): Promise<String[]> {
    return Promise.resolve(Identifies);
  }

  getGenders(): Promise<String[]> {
    return Promise.resolve(Genders);
  }

  private sharesUrl = 'http://localhost:3000/shares';

  getShares(): Promise<Share[]> {
    return this.http.get(this.sharesUrl)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
