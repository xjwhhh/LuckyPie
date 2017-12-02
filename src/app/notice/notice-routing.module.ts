import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NoticeComponent} from './notice.component';
import {NoticeThumbComponent} from './thumb/thumb.component';
import {NoticeCommentComponent} from './comment/comment.component';


const NoticeRoutes: Routes = [
  {
    path: 'notice/:id',
    component: NoticeComponent,
    children: [
      {
        path: '',
        component: NoticeThumbComponent,
      },
      {
        path: 'thumb',
        component: NoticeThumbComponent,
      },
      {
        path: 'comment',
        component: NoticeCommentComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(NoticeRoutes)
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   CrisisDetailResolver
  // ]
})
export class NoticeRoutingModule {
}
