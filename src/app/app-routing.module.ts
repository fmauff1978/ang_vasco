import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { CourseResolver } from './services/courseresolver.service';
import { RegistroComponent } from './registro/registro.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";



const redirectUnauthorizedLogin = ()=> redirectUnauthorizedTo(['login']);
const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedLogin}
  },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedLogin}

  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedLogin}

  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent

  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent

  },

  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedLogin}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {

  path: 'register',
    component: RegistroComponent
  },
  {
    path: 'courses/:courseUrl',
    component: CourseComponent,
    resolve: {
      course: CourseResolver
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
