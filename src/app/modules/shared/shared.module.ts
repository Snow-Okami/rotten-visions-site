import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

/**
 * @description Custom Trim Word Pipe.
 */
import { TrimwordPipe } from '../../pipes/trimword.pipe';
import { NameonlyPipe } from '../../pipes/nameonly.pipe';

import { FooterComponent } from '../../components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    /**
     * @description Shares Pipes For Lazy Routing Modules.
     */
    TrimwordPipe,
    NameonlyPipe,

    /**
     * @description Shared Components For Lazy Routing Modules.
     */
    FooterComponent
  ],
  exports: [
    /**
     * @description Shares Pipes For Lazy Routing Modules.
     */
    TrimwordPipe,
    NameonlyPipe,

    /**
     * @description Shared Components For Lazy Routing Modules.
     */
    FooterComponent
  ]
})
export class SharedModule { }
