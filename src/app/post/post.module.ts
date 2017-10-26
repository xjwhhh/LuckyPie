import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PostService} from 'app/post/post.service';

import {PostComponent} from './post.component';
import {PostDateComponent} from './date/date.component';
import {PostShareComponent} from './share/share.component';
import {PostAlbumComponent} from './album/album.component';
import {PostRoutingModule} from './post-routing.module';

import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PostComponent,
    PostShareComponent,
    PostDateComponent,
    PostAlbumComponent
  ],
  providers: [PostService],
  bootstrap: [PostComponent]
})
export class PostModule {
}
