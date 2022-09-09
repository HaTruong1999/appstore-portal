import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home",
    pathMatch: "prefix",
    component: HomeComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: HomeComponent,
        data: { title: 'Dashboard' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
