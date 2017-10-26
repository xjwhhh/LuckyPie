import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from './post.component';
import {PostActivityComponent} from './date/date.component';
import {PostPhotoComponent} from './share/share.component';
import {PostAlbumComponent} from './album/album.component';


const PostRoutes: Routes = [
  {
    path: 'post',
    component: PostComponent,
    children: [
      {
        path: '',
        component: PostActivityComponent,
      },
      {
        path: 'activity',
        component: PostActivityComponent,
      },
      {
        path: 'photo',
        component: PostPhotoComponent,
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
