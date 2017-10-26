import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  FollowComponent
} from './follow/follow.component';
import {
  HotComponent
} from './hot/hot.component';
import {
  NoticeComponent
} from './notice/notice.component';
import {
  PostComponent
} from './post/post.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/follow',
  pathMatch: 'full'
},
  {
    path: 'post',
    loadChildren: 'app/post/post.module#PostModule',
    data: {
      preload: true
    }
  },
  {
    path: 'follow',
    component: FollowComponent
  },
  {
    path: 'explore',
    loadChildren: 'app/explore/explore.module#ExploreModule',
    data: {
      preload: true
    }
  },
  {
    path: 'hot',
    component: HotComponent,
  },
  {
    path: 'notice',
    // loadChildren: 'app/notice/notice.module#NoticeModule',
    // data: { preload: true },
    component: NoticeComponent
  },
  {
    path: 'identify',
    loadChildren: 'app/identify/identify.module#IdentifyModule',
    data: {
      preload: true
    }
  },
  {
    path: '**',
    component: FollowComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
