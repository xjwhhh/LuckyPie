import {
  Component,
  OnInit
} from '@angular/core';
import {
  FollowService
} from './follow.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

@Component({
  selector: 'follow',
  templateUrl: './follow.component.html',
  // styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {

  userId: number;

  constructor(private followService: FollowService,
   private route: ActivatedRoute,
   private router:Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
    });
    this.followService.setUserId(this.userId);
  }

  // gotoBigFollow(){
  //   this.router.navigate(['/big'])
  // }

}
