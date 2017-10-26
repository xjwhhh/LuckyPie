import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from './post.component';
import {PostDateComponent} from './date/date.component';
import {PostShareComponent} from './share/share.component';
import {PostAlbumComponent} from './album/album.component';


const PostRoutes: Routes = [
  {
    path: 'post',
    component: PostComponent,
    children: [
      {
        path: '',
        component: PostDateComponent,
      },
      {
        path: 'date',
        component: PostDateComponent,
      },
      {
        path: 'share',
        component: PostShareComponent,
      },
      {
        path: 'album',
        component: PostAlbumComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(PostRoutes)
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   CrisisDetailResolver
  // ]
})
export class PostRoutingModule {
}
