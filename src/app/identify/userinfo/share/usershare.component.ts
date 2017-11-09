import {Component,OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import {IdentifyService} from 'app/identify/identify.service';

@Component({
  selector: 'user-photo',
  templateUrl: './usershare.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserPhotoComponent implements OnInit{

	  constructor(
    private identifyService: IdentifyService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

	ngOnInit(){
		// this.route.paramMap
  //     .switchMap((params: ParamMap) =>console.log(+params.get('id')));
  console.log("56");
  console.log(this.location.path());

	}


}
