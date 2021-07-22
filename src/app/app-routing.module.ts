import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './helper/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-user', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'update-user', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
