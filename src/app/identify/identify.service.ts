import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Identities, Genders, Album, User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Injectable()
export class IdentifyService {
  user: User = new User();
  userId: number = -1;

  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private router: Router) {
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  getIdentities(): Promise<string[]> {
    return Promise.resolve(Identities);
  }

  getGenders(): Promise<string[]> {
    return Promise.resolve(Genders);
  }

  private loginUrl = 'http://localhost/LuckyPie-Server/api/post/user/login';

  login(account: string, password: string): Promise<User> {
    let data = new URLSearchParams();
    data.append("account", account);
    data.append("password", password);
    return this.http.post(this.loginUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private registerUrl = 'http://localhost/LuckyPie-Server/api/post/user/register';

  register(account: string, password: string): Promise<User> {
    let data = new URLSearchParams();
    data.append("account", account);
    data.append("password", password);
    return this.http.post(this.registerUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private userBasciInfoUrl = 'http://localhost/LuckyPie-Server/api/get/user/info/';

  getUserBasicInfo(userId: number): Promise<User> {
    return this.http.get(this.userBasciInfoUrl + userId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private userAlbumsUrl = 'http://localhost:3000/albums';

  getUserAlbums(): Promise<Album[]> {
    return this.http.get(this.userAlbumsUrl)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }

  getUserShares() {

  }

  getUserDating() {

  }

  getUserLikes() {

  }

  private updateUserBasicInfoUrl = 'http://localhost/LuckyPie-Server/api/post/user/info/'

  updateUserBasicInfo(userId: string, name: string, gender: string, identity: string, telephone: string, email: string) {
    let data = new URLSearchParams();
    data.append("name", name);
    data.append("gender", gender);
    data.append("identity", identity);
    data.append("telephone", telephone);
    data.append("email", email);
    return this.http.post(this.updateUserBasicInfoUrl + userId, data, this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }


}
