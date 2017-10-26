import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ExploreComponent} from './explore.component';
import {ExploreDateComponent} from './date/explore_date.component';
import {ExploreTagComponent} from './tag/explore_tag.component';
import {ExplorePhotographerComponent} from './photographer/explore_photographer.component';
import {ExploreModelComponent} from './model/explore_model.component';


const ExploreRoutes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    children: [
      {
        path: '',
        component: ExploreDateComponent,
      },
      {
        path: 'post',
        component: ExploreDateComponent,
      },
      {
        path: 'tag',
        component: ExploreTagComponent,
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
