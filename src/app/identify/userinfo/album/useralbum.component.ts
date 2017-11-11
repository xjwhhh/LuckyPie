import {Component, OnInit} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {Album} from 'app/entity/entity';
import {CarouselConfig} from 'ngx-bootstrap/carousel';

@Component({
  selector: 'user-album',
  templateUrl: './useralbum.component.html',
  styleUrls: ['./useralbum.component.css'],
  providers: [{provide: CarouselConfig, useValue: {interval: false}}]
})
export class UserAlbumComponent implements OnInit {

  albums: Album[] = [];
  selectedAlbum: Album = new Album();

  userId: number;

  constructor(private identifyService: IdentifyService) {

  }

  ngOnInit(): void {
    this.userId = this.identifyService.getUserId();
  }

  getUserAlbums(userId: number): void {
    this.identifyService.getUserAlbums(userId);
  }

  onClickAlbum(albumid: number) {
    this.albums.forEach((album, i) => {
      if (album.id == albumid) {
        this.selectedAlbum = album;
      }
    });
    console.log(this.selectedAlbum.imageUrls);
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

  fixheight = window.outerHeight;
}
