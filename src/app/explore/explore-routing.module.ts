import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ExploreComponent} from './explore.component';
import {ExplorePostComponent} from './post/explore_post.component';
import {ExplorePhotoComponent} from './photo/explore_photo.component';
import {ExplorePhotographerComponent} from './photographer/explore_photographer.component';
import {ExploreModelComponent} from './model/explore_model.component';


const ExploreRoutes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    children: [
      {
        path: '',
        component: ExplorePostComponent,
      },
      {
        path: 'post',
        component: ExplorePostComponent,
      },
      {
        path: 'photo',
        component: ExplorePhotoComponent,
      },
      {
        path: 'photographer',
        component: ExplorePhotographerComponent,
      },
      {
        path: 'model',
        component: ExploreModelComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ExploreRoutes)
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   CrisisDetailResolver
  // ]
})
export class ExploreRoutingModule {
}
