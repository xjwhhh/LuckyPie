import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {IdentifyService} from './identify.service';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {IdentifyComponent} from './identify.component';
import {IdentifyRoutingModule} from './identify-routing.module';
import {UserInfoComponent} from './userinfo/userinfo.component';
import {UserHomePageComponent} from './userinfo/userhomepage.component';
import {UserPhotoComponent} from './userinfo/share/usershare.component';
import {ShowPhotoComponent} from './userinfo/share/showshare.component';
import {UserActivityComponent} from './userinfo/date/userdate.component';
import {ShowActivityComponent} from './userinfo/date/showdate.component';
import {UserAlbumComponent} from './userinfo/album/useralbum.component';
import {ShowAlbumComponent} from './userinfo/album/showalbum.component';
import {UserLikeComponent} from './userinfo/like/like.component';
import {ShowLikeComponent} from './userinfo/like/showlike.component';
import {UserBasicInfoComponent} from './userinfo/basicinfo/basicinfo.component';
import {ShowBasicInfoComponent} from './userinfo/basicinfo/showbasicinfo.component';
import {UserEditInfoComponent} from './userinfo/editinfo/editinfo.component';
import {CarouselModule} from 'ngx-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    IdentifyRoutingModule,
    CarouselModule.forRoot(),
    FileUploadModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    IdentifyComponent,
    UserInfoComponent,
    UserHomePageComponent,
    UserAlbumComponent,
    UserActivityComponent,
    UserPhotoComponent,
    UserLikeComponent,
    UserBasicInfoComponent,
    UserEditInfoComponent,
    ShowAlbumComponent,
    ShowActivityComponent,
    ShowLikeComponent,
    ShowPhotoComponent,
    ShowBasicInfoComponent,
  ],
  providers: [IdentifyService],
  bootstrap: [IdentifyComponent]
})
export class IdentifyModule {
}
