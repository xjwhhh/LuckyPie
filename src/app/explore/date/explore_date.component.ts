import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  Share,
  Dating,
  User,
  ResultMessage
} from 'app/entity/entity';
import {URLSearchParams} from '@angular/http';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {UtilService} from 'app/util.service';


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

  datings: Dating[] = [];

  userId: number;

  users: User[] = [];

  addressStyles = [];
  costTypeStyles = [];
  identityStyles = [];
  genderStyles = [];

  selectedDating: Dating = new Dating();

  user: User;


  constructor(private exploreService: ExploreService,
              private utilService: UtilService,
              private router: Router,) {
  }


  ngOnInit(): void {
    this.userId = this.exploreService.getUserId();
    this.utilService.getUserBasicInfo(this.userId).then(user => this.user = user);
    this.getAddresses();
    this.getCostTypes();
    this.getIdentities();
    this.getGenders();
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  getAddresses(): void {
    this.exploreService.getAddresses().then(addresses => this.setAddress(addresses));
  }

  setAddress(addresses: string[]) {
    this.addresses = addresses;
    for (let i = 0; i < this.addresses.length; i++) {
      this.addressStyles.push({'background-color': 'white'});
    }
  }

  getCostTypes(): void {
    this.exploreService.getCostTypes().then(costTypes => this.setCostType(costTypes));
  }

  setCostType(costTypes: string[]) {
    this.costTypes = costTypes;
    for (let i = 0; i < this.costTypes.length; i++) {
      this.costTypeStyles.push({'background-color': 'white'});
    }
  }

  getIdentities(): void {
    this.exploreService.getIdentities().then(identities => this.setIdentity(identities));
  }

  setIdentity(identities: string[]) {
    this.identities = identities;
    for (let i = 0; i < this.identities.length; i++) {
      this.identityStyles.push({'background-color': 'white'});
    }
  }

  getGenders(): void {
    this.exploreService.getGenders().then(genders => this.genders = genders);
  }

  setGender(genders: string[]) {
    this.genders = genders;
    for (let i = 0; i < this.genders.length; i++) {
      this.genderStyles.push({'background-color': 'white'});
    }
  }

  selectAddress(selectedAddress: string, i: number): void {
    this.selectedAddress = selectedAddress;
    this.resetAddressStyles();
    this.addressStyles[i] = {'background-color': '#97cbff'};
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  selectCost(selectedCostType: string, i: number): void {
    this.selectedCostType = selectedCostType;
    this.resetCostTypeStyles();
    this.costTypeStyles[i] = {'background-color': '#97cbff'};
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  selectIdentity(selectedIdentity: string, i: number): void {
    this.selectedIdentity = selectedIdentity;
    this.resetIdentityStyles();
    this.identityStyles[i] = {'background-color': '#97cbff'};
    let data = this.createData();
    this.exploreService.getDating(data).then(datings => this.getDatingUser(datings));
  }

  selectGender(selectedGender: string, i: number): void {
    this.selectedGender = selectedGender;
    this.resetGenderStyles();
    this.genderStyles[i] = {'background-color': '#97cbff'};
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
    this.datings = [];
    for (let i = datings.length - 1; i >= 0; i--) {
      this.datings.push(datings[i]);
    }
    for (let i = 0; i < this.datings.length; i++) {
      let userId = this.datings[i].userId;
      this.utilService.getUserBasicInfo(userId).then(user => this.users.push(user));
    }
  }

  resetAddressStyles() {
    for (let i = 0; i < this.addresses.length; i++) {
      this.addressStyles[i] = {'background-color': 'white'};
    }
  }

  resetCostTypeStyles() {
    for (let i = 0; i < this.costTypeStyles.length; i++) {
      this.costTypeStyles[i] = {'background-color': 'white'};
    }
  }

  resetIdentityStyles() {
    for (let i = 0; i < this.identityStyles.length; i++) {
      this.identityStyles[i] = {'background-color': 'white'};
    }
  }


  resetGenderStyles() {
    for (let i = 0; i < this.genderStyles.length; i++) {
      this.genderStyles[i] = {'background-color': 'white'};
    }
  }


  gotoHomePage(ownerId: number) {
    this.router.navigate(['/identify/homePage', ownerId]);
  }


  onClickDating(datingId: number) {
    this.datings.forEach((dating, i) => {
      if (dating.id == datingId) {
        this.selectedDating = dating;
      }
    });
    this.setCurrentStyles();
  }

  gotoTagDetail(tag: string): void {
    this.router.navigate(['/explore/' + this.userId +
    '/tagdetail', tag
    ]);
  }

  currentStyles = {
    'width': '0',
    'height': '0',
    'opacity': '1',
    'background-color': '#000',
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'z-index': '-1',
    'display': 'none'
  };

  setCurrentStyles() {
    this.currentStyles = {
      'width': '100%',
      'height': '100%',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '1000',
      'display': 'block'
    };
  }

  closeBigPicture() {
    this.currentStyles = {
      'width': '0',
      'height': '0',
      'opacity': '1',
      'background-color': '#000',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'z-index': '-1',
      'display': 'none'
    };
  }
}
