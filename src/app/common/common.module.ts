import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsInputComponent } from './components/ns-input/ns-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NsInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NsInputComponent]
})
export class CommonComponentsModule { }
