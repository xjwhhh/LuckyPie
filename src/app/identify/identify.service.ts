import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Identities, Genders, Album, User, Share, Dating} from 'app/entity/entity';
import {Router} from '@angular/router';

@Injectable()
export class IdentifyService {
  user: User = new User();
  userId: number = 19;

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

  private userBasciInfoUrl = 'http://localhost/LuckyPie-Server/api/get/user/basicinfo/';

  getUserBasicInfo(userId: number): Promise<User> {
    return this.http.get(this.userBasciInfoUrl + userId)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private getUserAlbumsUrl = 'http://localhost/LuckyPie-Server/api/get/user/info/album/';

  getUserAlbums(userId: number): Promise<Album[]> {
    return this.http.get(this.getUserAlbumsUrl + userId)
      .toPromise()
      .then(response => response.json() as Album[])
      .catch(this.handleError);
  }


  private getUserSharesUrl = 'http://localhost/LuckyPie-Server/api/get/user/info/share/';

  getUserShares(userId: number): Promise<Share[]> {
    return this.http.get(this.getUserSharesUrl + userId)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private getUserDatingUrl = 'http://localhost/LuckyPie-Server/api/get/user/info/dating/';

  getUserDating(userId: number) {
    return this.http.get(this.getUserDatingUrl + userId)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private getUserLikesUrl = 'http://localhost/LuckyPie-Server/api/get/user/info/like/';

  getUserLikes(userId: number) {
    return this.http.get(this.getUserLikesUrl + userId)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private updateUserBasicInfoUrl = 'http://localhost/LuckyPie-Server/api/post/user/info';

  updateUserBasicInfo(userId: number, name: string, introduction: string, gender: string, identity: string, telephone: string, email: string): Promise<User> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    data.append("name", name);
    data.append("introduction", introduction);
    data.append("gender", gender);
    data.append("identity", identity);
    data.append("telephone", telephone);
    data.append("email", email);
    return this.http.post(this.updateUserBasicInfoUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }


}
