import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ExploreService
} from 'app/explore/explore.service';

import {ExploreComponent} from './explore.component';
import {ExplorePostComponent} from './post/explore_post.component';
import {ExplorePhotoComponent} from './photo/explore_photo.component';
import {ExplorePhotographerComponent} from './photographer/explore_photographer.component';
import {ExploreModelComponent} from './model/explore_model.component';
import {ExploreRoutingModule} from './explore-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ExploreRoutingModule,
  ],
  declarations: [
    ExploreComponent,
    ExplorePostComponent,
    ExplorePhotoComponent,
    ExplorePhotographerComponent,
    ExploreModelComponent,
  ],
  providers: [ExploreService],
  bootstrap: [ExploreComponent]
})
export class ExploreModule {
}
