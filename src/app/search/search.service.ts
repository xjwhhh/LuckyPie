import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Addresses, CostTypes, Tags, Share, Album, Dating, User } from 'app/entity/entity';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class SearchService {
  userId: number = -1;

  content:string="";

  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private router: Router) {}

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

    setContent(content:string) {
    this.content=content;
  }

  getContent(): string {
    return this.content;
  }


  private searchUserUrl = 'http://localhost/LuckyPie-Server/api/post/search/user';

  searchUser(content: string): Promise < User[] > {
    let data = new URLSearchParams();
    data.append("content", content);
    return this.http.post(this.searchUserUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private searchAlbumUrl = 'http://localhost/LuckyPie-Server/api/post/search/album';

  searchAlbum(content: string): Promise < Album[] > {
    let data = new URLSearchParams();
    data.append("content", content);
    return this.http.post(this.searchAlbumUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  private searchDatingUrl = 'http://localhost/LuckyPie-Server/api/post/search/dating';

  searchDating(content: string): Promise < Dating[] > {
    let data = new URLSearchParams();
    data.append("content", content);
    return this.http.post(this.searchDatingUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Dating[])
      .catch(this.handleError);
  }


  private searchShareUrl = 'http://localhost/LuckyPie-Server/api/post/search/share';

  searchShare(content: string): Promise < Share[] > {
    let data = new URLSearchParams();
    data.append("content", content);
    return this.http.post(this.searchShareUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }


}
