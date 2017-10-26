import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  HotService
} from './hot.service';

import {HotComponent} from './hot.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HotComponent],
  providers: [HotService],
  bootstrap: [HotComponent]
})
export class HotModule {
}
