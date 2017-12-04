import { Component, OnInit } from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share,
  Dating,
  User
} from 'app/entity/entity';
import { URLSearchParams } from '@angular/http';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import { UtilService } from 'app/util.service';


@Component({
  selector: 'explore-date',
  templateUrl: './explore_date.component.html',
  styleUrls: ['./explore_date.component.css'],
})
export class ExploreDateComponent implements OnInit {
  addresses: string[];
  costTypes: string[];
  identities: string[];
  genders: string[];
  shares: Share[];

  selectedAddress: string = '全部';
  selectedCostType: string = '全部';
  selectedIdentity: string = '无';
  selectedGender: string = '无';

  datings: Dating[];

  userId: number;

  users: User[] = [];


  constructor(private exploreService: ExploreService, private utilService: UtilService,private router:Router) {}


  ngOnInit(): void {
    this.userId = this.exploreService.getUserId();
    this.getAddresses();
    this.getCostTypes();
    this.getIdentities();
    this.getGenders();
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  getAddresses(): void {
    this.exploreService.getAddresses().then(addresses => this.addresses = addresses);
  }

  getCostTypes(): void {
    this.exploreService.getCostTypes().then(costTypes => this.costTypes = costTypes);
  }

  getIdentities(): void {
    this.exploreService.getIdentities().then(identities => this.identities = identities);
  }

  getGenders(): void {
    this.exploreService.getGenders().then(genders => this.genders = genders);
  }

  selectAddress(selectedAddress: string): void {
    console.log(selectedAddress);
    this.selectedAddress = selectedAddress;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  selectCost(selectedCostType: string): void {
    console.log(selectedCostType);
    this.selectedCostType = selectedCostType;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  selectIdentity(selectedIdentity: string): void {
    console.log(selectedIdentity);
    this.selectedIdentity = selectedIdentity;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  selectGender(selectedGender: string): void {
    console.log(selectedGender);
    this.selectedGender = selectedGender;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  createData() {
    let data = new URLSearchParams();
    data.append("address", this.selectedAddress);
    data.append("cost", this.selectedCostType);
    data.append("identity", this.selectedIdentity);
    data.append("gender", this.selectedGender);
    return data;
  }

  getDatingUser(datings: Dating[]) {
    this.datings = datings;
    console.log(datings);
    for (let i = 0; i < datings.length; i++) {
      let userId = datings[i].userId;
      this.utilService.getUserBasicInfo(userId).then(user => this.users.push(user));
    }
  }


  gotoHomePage(ownerId: number) {
    console.log(ownerId);
    this.router.navigate(['/identify/homePage', ownerId]);
  }
}
