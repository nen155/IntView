import { AddInterviewComponent } from './shared/components/add-interview/add-interview.component';
import { InterviewsComponent } from './pages/interviews/interviews.component';
import { BillingComponent } from './pages/billing/billing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './pages/business/business.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService as AuthGuard} from './core/services/auth-guard.service';
import { AuthService } from './core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InterviewProgressComponent } from './pages/interview-progress/interview-progress.component';
import { UsersComponent } from './pages/users/users.component';
import { InterviewComponent } from './shared/components/interview/interview.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },
  { path: 'interviews', component: InterviewsComponent, canActivate: [AuthGuard] },
  { path: 'interview-progress', component: InterviewProgressComponent, canActivate: [AuthGuard] },
  { path: 'business', component: BusinessComponent, canActivate: [AuthGuard] },
  { path: 'add-interview', component: AddInterviewComponent, canActivate: [AuthGuard] },
  { path: 'interview', component: InterviewComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService, JwtHelperService]
})
export class AppRoutingModule { }
