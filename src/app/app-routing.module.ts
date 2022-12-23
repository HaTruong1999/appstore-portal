import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home",pathMatch: "full", component: HomeComponent},
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { relativeLinkResolution: "legacy" , useHash: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
