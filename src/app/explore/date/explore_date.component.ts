import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share
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
  }

  selectCost(selectedCostType: string): void {
    console.log(selectedCostType);
    this.selectedCostType = selectedCostType;
  }

  selectIdentity(selectedIdentity: string): void {
    console.log(selectedIdentity);
    this.selectedIdentity = selectedIdentity;
  }

  selectGender(selectedGender: string): void {
    console.log(selectedGender);
    this.selectedGender = selectedGender;
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
