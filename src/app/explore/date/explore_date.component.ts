import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share,
  Dating
} from 'app/entity/entity';
import {URLSearchParams} from '@angular/http';


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


  constructor(private exploreService: ExploreService) {
  }


  ngOnInit(): void {
    this.userId = this.exploreService.getUserId();
    this.getAddresses();
    this.getCostTypes();
    this.getIdentities();
    this.getGenders();
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.datings = datings);
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
    this.exploreService.getDating(data).then(datings => this.datings = datings);
  }

  selectCost(selectedCostType: string): void {
    console.log(selectedCostType);
    this.selectedCostType = selectedCostType;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.datings = datings);
  }

  selectIdentity(selectedIdentity: string): void {
    console.log(selectedIdentity);
    this.selectedIdentity = selectedIdentity;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.datings = datings);
  }

  selectGender(selectedGender: string): void {
    console.log(selectedGender);
    this.selectedGender = selectedGender;
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.datings = datings);
  }

  createData() {
    let data = new URLSearchParams();
    data.append("address", this.selectedAddress);
    data.append("cost", this.selectedCostType);
    data.append("identity", this.selectedIdentity);
    data.append("gender", this.selectedGender);
    return data;
  }
}
