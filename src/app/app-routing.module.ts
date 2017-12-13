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
import {SearchComponent} from './search/search.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/identify',
  pathMatch: 'full'
},
  {
    path: 'post/:id',
    loadChildren: 'app/post/post.module#PostModule',
    data: {
      preload: true
    }
  },
  {
    path: 'follow/:id',
    component: FollowComponent
  },
  {
    path: 'explore/:id',
    loadChildren: 'app/explore/explore.module#ExploreModule',
    data: {
      preload: true
    }
  },
  {
    path: 'hot/:id',
    component: HotComponent,
  },
  {
    path: 'notice/:id',
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
    path: 'search/:id',
    component: SearchComponent
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
