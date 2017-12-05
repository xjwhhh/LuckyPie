import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {Router} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {FollowModule} from './follow/follow.module';
import {HotModule} from './hot/hot.module';
import {ExploreModule} from './explore/explore.module';
import {IdentifyModule} from './identify/identify.module';
import {NoticeModule} from './notice/notice.module';
import {PostModule} from './post/post.module';
import {SearchModule} from './search/search.module';

import {BsDropdownModule} from 'ngx-bootstrap';
import {ImageUploadModule} from 'angular2-image-upload';

@NgModule({
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    ImageUploadModule.forRoot(),
    ExploreModule,
    FollowModule,
    HotModule,
    IdentifyModule,
    NoticeModule,
    PostModule,
    SearchModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
