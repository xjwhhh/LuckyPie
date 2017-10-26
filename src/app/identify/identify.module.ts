import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {IdentifyService} from './identify.service';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {IdentifyComponent} from './identify.component';
import {IdentifyRoutingModule} from './identify-routing.module';
import {UserInfoComponent} from './userinfo/userinfo.component';
import {UserPhotoComponent} from './userinfo/share/usershare.component';
import {UserActivityComponent} from './userinfo/date/userdate.component';
import {UserAlbumComponent} from './userinfo/album/useralbum.component';
import {UserLikeComponent} from './userinfo/like/like.component';
import {UserBasicInfoComponent} from './userinfo/basicinfo/basicinfo.component';
import {UserEditInfoComponent} from './userinfo/editinfo/editinfo.component';
import {CarouselModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    IdentifyRoutingModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    IdentifyComponent,
    UserInfoComponent,
    UserAlbumComponent,
    UserActivityComponent,
    UserPhotoComponent,
    UserLikeComponent,
    UserBasicInfoComponent,
    UserEditInfoComponent,
  ],
  providers: [IdentifyService],
  bootstrap: [IdentifyComponent]
})
export class IdentifyModule {
}
