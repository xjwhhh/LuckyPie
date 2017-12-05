import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Addresses, CostTypes, Identities, Genders, User, Dating, Album, ResultMessage} from 'app/entity/entity';

@Injectable()
export class ExploreService {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  private selectedTag: String;

  userId: number;

  constructor(private http: Http) {
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

  getIdentities(): Promise<string[]> {
    return Promise.resolve(Identities);
  }

  getGenders(): Promise<string[]> {
    return Promise.resolve(Genders);
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  private getSharesUrl = 'http://localhost/LuckyPie-Server/api/post/explore/share';

  getSharesByTag(selectedTag: string): Promise<Share[]> {
    let data = new URLSearchParams();
    data.append("selectedTag", selectedTag);
    return this.http.post(this.getSharesUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private getAllTagsUrl = 'http://localhost/LuckyPie-Server/api/get/explore/tags';

  getAllTags(): Promise<string[]> {
    return this.http.get(this.getAllTagsUrl)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError);
  }

  setSelectedTag(selectedTag: string) {
    this.selectedTag = selectedTag;
  }

  getSelectedTag(): String {
    return this.selectedTag;
  }

  private getDatingUrl = 'http://localhost/LuckyPie-Server/api/post/explore/dating';

  getDating(data: URLSearchParams): Promise<Dating[]> {
    return this.http.post(this.getDatingUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as Dating[])
      .catch(this.handleError);
  }

  private getUserSharesUrl = 'http://localhost/LuckyPie-Server/api/get/user/info/share/limit/';

  getUserShares(userId: number): Promise<Share[]> {
    return this.http.get(this.getUserSharesUrl + userId)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  private getHotPhotographerUrl = 'http://localhost/LuckyPie-Server/api/get/explore/photographer/hot';

  getHotPhotographer(): Promise<User[]> {
    return this.http.get(this.getHotPhotographerUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private getBestPhotographerUrl = 'http://localhost/LuckyPie-Server/api/get/explore/photographer/best';

  getBestPhotographer(): Promise<User[]> {
    return this.http.get(this.getBestPhotographerUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);

  }

  private getNewPhotographerUrl = 'http://localhost/LuckyPie-Server/api/get/explore/photographer/new';

  getNewPhotographer(): Promise<User[]> {
    return this.http.get(this.getNewPhotographerUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);

  }

  private getHotModelUrl = 'http://localhost/LuckyPie-Server/api/get/explore/model/hot';

  getHotModel(): Promise<User[]> {
    return this.http.get(this.getHotModelUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);

  }

  private getBestModelUrl = 'http://localhost/LuckyPie-Server/api/get/explore/model/best';

  getBestModel(): Promise<User[]> {
    return this.http.get(this.getBestModelUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);

  }

  private getNewModelUrl = 'http://localhost/LuckyPie-Server/api/get/explore/model/new';

  getNewModel(): Promise<User[]> {
    return this.http.get(this.getNewModelUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private followUrl = 'http://localhost/LuckyPie-Server/api/post/follow';

  follow(followUserId: number): Promise<ResultMessage> {
    let data = new URLSearchParams();
    data.append("followId", followUserId + "");
    data.append("followerId", this.userId + "");
    return this.http.post(this.followUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

  private removeFollowUrl = 'http://localhost/LuckyPie-Server/api/post/removeFollow';

  removeFollow(followUserId: number): Promise<ResultMessage> {
    let data = new URLSearchParams();
    data.append("followId", followUserId + "");
    data.append("followerId", this.userId + "");
    return this.http.post(this.removeFollowUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }

  private isFollowUrl = 'http://localhost/LuckyPie-Server/api/post/isFollow';

  isFollow(userId: number, checkUserId: number): Promise<ResultMessage> {
    let data = new URLSearchParams();
    data.append("userId", userId + "");
    data.append("checkUserId", checkUserId + "");
    return this.http.post(this.isFollowUrl, data, this.options)
      .toPromise()
      .then(response => response.json() as ResultMessage)
      .catch(this.handleError);
  }


}
