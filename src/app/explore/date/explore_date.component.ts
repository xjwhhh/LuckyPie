import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share, Dating
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

  selectedAddress: string = '';
  selectedCostType: string = '';
  selectedIdentity: string = '';
  selectedGender: string = '';

  datings: Dating[];


  constructor(private exploreService: ExploreService) {
  }


  ngOnInit(): void {
    this.getAddresses();
    this.getCostTypes();
    this.getIdentities();
    this.getGenders();
    this.getShares();
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

  getShares(): void {
    this.exploreService.getShares().then(shares => this.shares = shares);
  }


  selectAddress(selectedAddress: string): void {
    console.log(selectedAddress);
    this.selectedAddress = selectedAddress;
    let data = this.createData();
    this.exploreService.getDating(data);
  }

  selectCost(selectedCostType: string): void {
    console.log(selectedCostType);
    this.selectedCostType = selectedCostType;
    let data = this.createData();
    this.exploreService.getDating(data);
  }

  selectIdentity(selectedIdentity: string): void {
    console.log(selectedIdentity);
    this.selectedIdentity = selectedIdentity;
    let data = this.createData();
    this.exploreService.getDating(data);
  }

  selectGender(selectedGender: string): void {
    console.log(selectedGender);
    this.selectedGender = selectedGender;
    let data = this.createData();
    this.exploreService.getDating(data);
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
