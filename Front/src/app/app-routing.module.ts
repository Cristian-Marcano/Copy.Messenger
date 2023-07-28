import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignComponent } from './components/sign/sign.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'sign',component:SignComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
