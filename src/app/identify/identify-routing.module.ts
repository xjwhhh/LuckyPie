import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {IdentifyComponent} from './identify.component';
import {UserInfoComponent} from './userinfo/userinfo.component';
import {UserPhotoComponent} from './userinfo/share/usershare.component';
import {UserActivityComponent} from './userinfo/date/userdate.component';
import {UserAlbumComponent} from './userinfo/album/useralbum.component';
import {UserLikeComponent} from './userinfo/like/like.component';
import {UserBasicInfoComponent} from './userinfo/basicinfo/basicinfo.component';
import {UserEditInfoComponent} from './userinfo/editinfo/editinfo.component';
import {UserHomePageComponent} from './userinfo/userhomepage.component';
import {ShowPhotoComponent} from './userinfo/share/showshare.component';
import {ShowActivityComponent} from './userinfo/date/showdate.component';
import {ShowAlbumComponent} from './userinfo/album/showalbum.component';
import {ShowLikeComponent} from './userinfo/like/showlike.component';
import {ShowBasicInfoComponent} from './userinfo/basicinfo/showbasicinfo.component';

const IdentifyRoutes: Routes = [{
  path: 'identify',
  component: IdentifyComponent,
  children: [{
    path: '',
    component: LoginComponent,
  },
    {
      path: 'info/:id',
      component: UserInfoComponent,
      children: [{
        path: '',
        redirectTo: 'dating',
        pathMatch: 'full'
      },
        {
          path: 'dating',
          component: UserActivityComponent,
        },
        {
          path: 'share',
          component: UserPhotoComponent,
        },
        {
          path: 'album',
          component: UserAlbumComponent,
        },
        {
          path: 'like',
          component: UserLikeComponent,
        },
        {
          path: 'basicinfo',
          component: UserBasicInfoComponent,
        },
        {
          path: 'editinfo',
          component: UserEditInfoComponent,
        },
      ]
    },
    {
      path: 'homePage/:id',
      component: UserHomePageComponent,
      children: [{
        path: '',
        redirectTo: 'dating',
        pathMatch: 'full'
      },
        {
          path: 'dating',
          component: ShowActivityComponent,
        },
        {
          path: 'share',
          component: ShowPhotoComponent,
        },
        {
          path: 'album',
          component: ShowAlbumComponent,
        },
        {
          path: 'like',
          component: ShowLikeComponent,
        },
        {
          path: 'basicinfo',
          component: ShowBasicInfoComponent,
        },

      ]
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
  ]
},];

@NgModule({
  imports: [
    RouterModule.forChild(IdentifyRoutes)
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   CrisisDetailResolver
  // ]
})
export class IdentifyRoutingModule {
}
