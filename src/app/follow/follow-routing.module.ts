import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FollowBigComponent} from './big/follow_big.component';
import {FollowSmallComponent} from './small/follow_small.component';
import {FollowComponent} from './follow.component';


const FollowRoutes: Routes = [{
  path: 'follow/:id',
  component: FollowComponent,
  children: [{
    path: '',
    component: FollowBigComponent,
  },
    {
      path: 'big',
      component: FollowBigComponent,
    },
    {
      path: 'small',
      component: FollowSmallComponent,
    },

  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(FollowRoutes)
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   CrisisDetailResolver
  // ]
})
export class FollowRoutingModule {
}
