import {
  Component,
  OnInit
} from '@angular/core';
import {
  ExploreService
} from './explore.service';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: [ExploreService]
})
export class ExploreComponent implements OnInit {

  // addresses: String[];


  constructor(private exploreService: ExploreService) {
  }

  // getAddresses(): void {
  // 	this.exploreService.getAddresses().then(addresses => this.addresses = addresses);
  // }

  ngOnInit(): void {
    // this.getAddresses();
  }
}
