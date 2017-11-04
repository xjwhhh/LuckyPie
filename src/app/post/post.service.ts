import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Addresses, CostTypes, Tags} from 'app/entity/entity';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class PostService {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private router: Router) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
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

  private uploadDateUrl = 'http://localhost/LuckyPie-Server/api/post/post/dating/upload';

  uploadDating(datingInfo: string) {
    let data = new URLSearchParams();
    data.append("datingInfo", datingInfo);
    return this.http.post(this.uploadDateUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private uploadAlbumUrl = 'http://localhost/LuckyPie-Server/api/post/post/album/upload';

  uploadAlbum(albumInfo: string) {
    let data = new URLSearchParams();
    data.append("albumInfo", albumInfo);
    return this.http.post(this.uploadAlbumUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private uploadShareUrl = 'http://localhost/LuckyPie-Server/api/post/post/share/upload';

  uploadShare(shareInfo: string) {
    let data = new URLSearchParams();
    data.append("shareInfo", shareInfo);
    return this.http.post(this.uploadShareUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }


}
