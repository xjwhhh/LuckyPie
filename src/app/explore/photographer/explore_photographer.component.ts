import {Component, OnInit} from '@angular/core';
import {
  ExploreService
} from 'app/explore/explore.service';
import {
  User,
  Share
} from 'app/entity/entity';

@Component({
  selector: 'explore-photographer',
  templateUrl: './explore_photographer.component.html',
  // styleUrls: ['./explore_photographer.component.css'],
})
export class ExplorePhotographerComponent implements OnInit {

  photographers: User[];
  shares: Share[]; //应该每个user都有对应的shares
  selectedShare: Share = new Share();

  constructor(private exploreService: ExploreService) {
  }

  ngOnInit(): void {
    this.selectHotPhotographers();
  }

  selectHotPhotographers() {
    this.exploreService.getHotPhotographer();
    console.log("1");

  }

  selectBestPhotographers() {
    this.exploreService.getBestPhotographer();
    console.log("1");

  }

  selectNewPhotographers() {
    this.exploreService.getNewPhotographer();
    console.log("1");

  }

  follow() {

  }


  onClickShare() {
    // this.albums.forEach((album, i) => {
    //   if (album.id == albumid) {
    //     this.selectedAlbum = album;
    //   }
    // });
    // console.log(this.selectedAlbum.imageUrls);
    this.setCurrentStyles();
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
    console.log("success");
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
