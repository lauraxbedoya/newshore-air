import { NgModule } from '@angular/core';
import { JourneyFinderComponent } from './components/journey-finder/journey-finder.component';
import { CommonComponentsModule } from '../common/common.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [JourneyFinderComponent],
  imports: [CommonModule, CommonComponentsModule, FormsModule],
  exports: [JourneyFinderComponent]
})
export class JourneyModule { }
