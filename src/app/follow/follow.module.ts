import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FollowComponent} from './follow.component';
import {FollowService} from './follow.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FollowComponent],
  bootstrap: [FollowComponent],
  providers: [FollowService]
})
export class FollowModule {
}
