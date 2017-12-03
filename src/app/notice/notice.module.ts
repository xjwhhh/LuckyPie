import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NoticeComponent} from './notice.component';
import {NoticeThumbComponent} from './thumb/thumb.component';
import {NoticeCommentComponent} from './comment/comment.component';

import {NoticeRoutingModule} from './notice-routing.module';

import {
  NoticeService
} from './notice.service';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NoticeRoutingModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    NoticeComponent,
    NoticeCommentComponent,
    NoticeThumbComponent,
  ],
  bootstrap: [NoticeComponent],
  providers: [NoticeService]
})
export class NoticeModule {
}
