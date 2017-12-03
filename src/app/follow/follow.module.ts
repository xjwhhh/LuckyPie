import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FollowComponent} from './follow.component';
import {FollowService} from './follow.service';
import {CarouselModule} from 'ngx-bootstrap';
import {UtilService} from 'app/util.service';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
  ],
  declarations: [FollowComponent],
  bootstrap: [FollowComponent],
  providers: [FollowService, UtilService]
})
export class FollowModule {
}
