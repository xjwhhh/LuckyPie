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

  private sharesUrl = 'http://localhost:3000/shares';

  getShares(): Promise<Share[]> {
    return this.http.get(this.sharesUrl)
      .toPromise()
      .then(response => response.json() as Share[])
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

  getDating() {

  }

  getHotPhotographer() {

  }

  getBestPhotographer() {

  }

  getNewPhotographer() {

  }

  getHotModel() {

  }

  getBestModel() {

  }

  getNewModel() {

  }


}
