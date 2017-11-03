import {Injectable} from '@angular/core';
import {Headers, Http,RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Identifies, Genders, Album,User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Injectable()
export class IdentifyService {
  user:User=new User();

  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http,private router:Router) {
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


  private loginUrl='http://localhost/LuckyPie-Server/api/post/user/login';
  login(account:string,password:string):Promise<User>{
    let data = new URLSearchParams();
    data.append("account",account);
    data.append("password",password);
    return this.http.post(this.loginUrl, data,this.options)
      .toPromise()
      .then(response => response.json() as User )
      .catch(this.handleError);
  }

  private registerUrl='http://localhost/LuckyPie-Server/api/post/user/register';
    register(account:string,password:string):Promise<User>{
    let data = new URLSearchParams();
    data.append("account",account);
    data.append("password",password);
    return this.http.post(this.registerUrl, data,this.options)
      .toPromise()
      .then(response => response.json() as User )
      .catch(this.handleError);
  }

  // gotoUserInfo(){
  //   this.router.navigate(['/identify/info',this.user.account]);
  // }



}
