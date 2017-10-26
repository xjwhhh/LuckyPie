import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NoticeComponent} from './notice.component';
import {NoticeThumbComponent} from './thumb/thumb.component';
import {NoticeCommentComponent} from './comment/comment.component';

import {NoticeRoutingModule} from './notice-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NoticeRoutingModule
  ],
  declarations: [
    NoticeComponent,
    NoticeCommentComponent,
    NoticeThumbComponent,
  ],
  bootstrap: [NoticeComponent]
})
export class NoticeModule {
}
