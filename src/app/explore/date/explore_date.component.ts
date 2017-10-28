import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share
} from 'app/entity/entity';


@Component({
  selector: 'explore-date',
  templateUrl: './explore_date.component.html',
  styleUrls: ['./explore_date.component.css'],
})
export class ExploreDateComponent implements OnInit {
  addresses: String[];
  costTypes: String[];
  identifies: String[];
  genders: String[];
  shares: Share[];


  constructor(private exploreService: ExploreService) {
  }


  ngOnInit(): void {
    this.getAddresses();
    this.getCostTypes();
    this.getIdentifies();
    this.getGenders();
    this.getShares();
  }

  getAddresses(): void {
    this.exploreService.getAddresses().then(addresses => this.addresses = addresses);
  }

  getCostTypes(): void {
    this.exploreService.getCostTypes().then(costTypes => this.costTypes = costTypes);
  }

  getIdentifies(): void {
    this.exploreService.getIdentifies().then(identifies => this.identifies = identifies);
  }

  getGenders(): void {
    this.exploreService.getGenders().then(genders => this.genders = genders);
  }

  getShares(): void {
    this.exploreService.getShares().then(shares => this.shares = shares);
  }


  selectAddress(selectedAddress: String): void {
    console.log(selectedAddress);
  }

  selectCost(selectedCostType: String): void {
    console.log(selectedCostType);
  }

  selectIdentify(selectedIdentify: String): void {
    console.log(selectedIdentify);
  }

  selectGender(selectedGender: String): void {
    console.log(selectedGender);
  }
}
