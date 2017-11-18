import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ExploreService
} from 'app/explore/explore.service';

import {ExploreComponent} from './explore.component';
import {ExploreDateComponent} from './date/explore_date.component';
import {ExploreTagComponent} from './tag/explore_tag.component';
import {ExplorePhotographerComponent} from './photographer/explore_photographer.component';
import {ExploreModelComponent} from './model/explore_model.component';
import {ExploreTagDetailComponent} from './tagdetail/tag_detail.component';
import {ExploreRoutingModule} from './explore-routing.module';
import {ExploreShowAllTagsComponent} from './alltags/all_tags.component';
import {CarouselModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ExploreRoutingModule,
    CarouselModule.forRoot(),
  ],
  declarations: [
    ExploreComponent,
    ExploreDateComponent,
    ExploreTagComponent,
    ExplorePhotographerComponent,
    ExploreModelComponent,
    ExploreTagDetailComponent,
    ExploreShowAllTagsComponent,
  ],
  providers: [ExploreService],
  bootstrap: [ExploreComponent]
})
export class ExploreModule {
}
