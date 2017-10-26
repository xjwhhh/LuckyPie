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

const IdentifyRoutes: Routes = [
  {
    path: 'identify',
    component: IdentifyComponent,
    children: [
      {
        path: '',
        component: UserInfoComponent,
        children: [
          {
            path: 'activity',
            component: UserActivityComponent,
          },
          {
            path: 'photo',
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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]
  },
];

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
