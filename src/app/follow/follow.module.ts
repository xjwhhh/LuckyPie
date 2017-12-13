import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FollowBigComponent} from './big/follow_big.component';
import {FollowSmallComponent} from './small/follow_small.component';
import {FollowComponent} from './follow.component';
import {FollowRoutingModule} from './follow-routing.module';
import {FollowService} from './follow.service';
import {CarouselModule} from 'ngx-bootstrap';
import {UtilService} from 'app/util.service';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    FollowRoutingModule,
  ],
  declarations: [
    FollowBigComponent,
    FollowSmallComponent,
    FollowComponent
  ],
  bootstrap: [FollowBigComponent],
  providers: [FollowService, UtilService]
})
export class FollowModule {
}
