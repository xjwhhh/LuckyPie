import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from 'app/search/search.service'
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchAlbumComponent } from './album/search_album.component';
import { SearchShareComponent } from './share/search_share.component';
import { SearchDatingComponent } from './dating/search_dating.component';
import { SearchUserComponent } from './user/search_user.component';
import {CarouselModule} from 'ngx-bootstrap';
import {UtilService} from 'app/util.service';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    CarouselModule.forRoot(),
  ],
  declarations: [
    SearchComponent,
    SearchUserComponent,
    SearchShareComponent,
    SearchDatingComponent,
    SearchAlbumComponent
  ],
  providers: [SearchService,UtilService],
  bootstrap: [SearchComponent]
})
export class SearchModule {}
