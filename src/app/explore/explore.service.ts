import {Injectable} from '@angular/core';
import {Share} from 'app/entity/entity';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Addresses, CostTypes, Identities, Genders} from 'app/entity/entity';

@Injectable()
export class ExploreService {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({headers: this.headers});

  private selectedTag: String;

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

  private sharesUrl = 'http://localhost/LuckyPie-Server/api/post/explore/share';

  getShares() {
    return this.http.get(this.sharesUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  getSharesByTag(selectedTag: string): Promise<Share[]> {
    return this.http.get(this.sharesUrl)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  getAllTags(selectedTag: string): Promise<Share[]> {
    return this.http.get(this.sharesUrl)
      .toPromise()
      .then(response => response.json() as Share[])
      .catch(this.handleError);
  }

  setSelectedTag(selectedTag: string) {
    this.selectedTag = selectedTag;
    // console.log(this.selectedTag);
  }

  getSelectedTag(): String {
    return this.selectedTag;
  }

  private getDatingUrl = 'http://localhost/LuckyPie-Server/api/post/explore/dating';

  getDating(data: URLSearchParams) {
    this.http.post(this.getDatingUrl, data, this.options)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private getHotPhotographerUrl = 'http://localhost/LuckyPie-Server/api/get/explore/photographer/hot';

  getHotPhotographer() {
    this.http.get(this.getHotPhotographerUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);

  }

  private getBestPhotographerUrl = 'http://localhost/LuckyPie-Server/api/get/explore/photographer/best';

  getBestPhotographer() {
    this.http.get(this.getBestPhotographerUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);

  }

  private getNewPhotographerUrl = 'http://localhost/LuckyPie-Server/api/get/explore/photographer/new';

  getNewPhotographer() {
    this.http.get(this.getNewPhotographerUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);

  }

  private getHotModelUrl = 'http://localhost/LuckyPie-Server/api/get/explore/model/hot';

  getHotModel() {
    this.http.get(this.getHotModelUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);

  }

  private getBestModelUrl = 'http://localhost/LuckyPie-Server/api/get/explore/model/best';

  getBestModel() {
    this.http.get(this.getBestModelUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);

  }

  private getNewModelUrl = 'http://localhost/LuckyPie-Server/api/get/explore/model/new';

  getNewModel() {
    this.http.get(this.getNewModelUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }


}
