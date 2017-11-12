import {Component, OnInit} from '@angular/core';
import {IdentifyService} from 'app/identify/identify.service';
import {Album} from 'app/entity/entity';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {DomSanitizer} from '@angular/platform-browser';

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

  constructor(private identifyService: IdentifyService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.userId = this.identifyService.getUserId();
    this.getUserAlbums(this.userId);
  }

  getUserAlbums(userId: number): void {
    this.identifyService.getUserAlbums(userId).then(albums => this.setAlbums(albums));
  }

  setAlbums(albums: Album[]) {
    for (let i = 0; i < albums.length; i++) {
      let album = albums[i];
      for (let j = 0; j < album.imageUrls.length; j++) {
        album.imageUrls[j] = this.sanitizer.bypassSecurityTrustResourceUrl(album.imageUrls[j]);
      }
      albums[i] = album;
    }
    this.albums = albums;
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
