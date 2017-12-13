import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchComponent} from './search.component';
import {SearchAlbumComponent} from './album/search_album.component';
import {SearchShareComponent} from './share/search_share.component';
import {SearchDatingComponent} from './dating/search_dating.component';
import {SearchUserComponent} from './user/search_user.component';

const SearchRoutes: Routes = [{
  path: 'search/:id',
  component: SearchComponent,
  children: [{
    path: '',
    component: SearchUserComponent,
  },
    {
      path: 'user',
      component: SearchUserComponent,
    },
    {
      path: 'dating',
      component: SearchDatingComponent,
    },
    {
      path: 'share',
      component: SearchShareComponent,
    },
    {
      path: 'album',
      component: SearchAlbumComponent,
    },
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(SearchRoutes)
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   CrisisDetailResolver
  // ]
})
export class SearchRoutingModule {
}

