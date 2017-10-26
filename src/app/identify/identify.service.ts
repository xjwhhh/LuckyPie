import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Identifies, Genders, Album} from 'app/entity/entity';

@Injectable()
export class IdentifyService {
  constructor(private http: Http) {
  }

  private userAlbumsUrl = 'http://localhost:3000/albums';


  getUserAlbums(): Promise<Album[]> {
    return this.http.get(this.userAlbumsUrl)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  getIdentifies(): Promise<String[]> {
    return Promise.resolve(Identifies);
  }

  getGenders(): Promise<String[]> {
    return Promise.resolve(Genders);
  }


}
