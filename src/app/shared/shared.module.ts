import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingPageComponent } from './component/loading-page/loading-page.component';

@NgModule({
  declarations: [LoadingPageComponent],
  imports: [
    CommonModule,
    //NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    //NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingPageComponent
  ],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    }
  }
}
