import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ExploreComponent} from './explore.component';
import {ExploreDateComponent} from './date/explore_date.component';
import {ExploreTagComponent} from './tag/explore_tag.component';
import {ExplorePhotographerComponent} from './photographer/explore_photographer.component';
import {ExploreModelComponent} from './model/explore_model.component';
import {ExploreTagDetailComponent} from './tagdetail/tag_detail.component';
import {ExploreShowAllTagsComponent} from './alltags/all_tags.component';


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
        path: 'date',
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
      { path: 'tagdetail/:selectedTag', component: ExploreTagDetailComponent},
      { path: 'showalltags/:selectedArea', component: ExploreShowAllTagsComponent},
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
