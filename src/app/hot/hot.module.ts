import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotService} from './hot.service';
import {UtilService} from 'app/util.service';

import {HotComponent} from './hot.component';
import {CarouselModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
  ],
  declarations: [HotComponent],
  providers: [HotService, UtilService],
  bootstrap: [HotComponent]
})
export class HotModule {
}
