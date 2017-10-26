import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Addresses, CostTypes, Tags} from 'app/entity/entity';

@Injectable()
export class PostService {
  constructor() {
  }

  getAddresses(): Promise<String[]> {
    return Promise.resolve(Addresses);
  }

  getCostTypes(): Promise<String[]> {
    return Promise.resolve(CostTypes);
  }

  getTags(): Promise<String[]> {
    return Promise.resolve(Tags);
  }


}
