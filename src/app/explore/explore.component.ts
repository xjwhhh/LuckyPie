import {
  Component,
  OnInit
} from '@angular/core';
import {
  ExploreService
} from './explore.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: [ExploreService]
})
export class ExploreComponent implements OnInit {

  userId: number;

  constructor(private exploreService: ExploreService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.setUserId();
  }

  setUserId() {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
      this.exploreService.setUserId(this.userId);
    });
  }
}
