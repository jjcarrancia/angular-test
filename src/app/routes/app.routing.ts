import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../screens/login/login.component';
import { JobsComponent } from '../screens/jobs/jobs.component';
import { JobDetailComponent } from '../screens/jobDetail/jobDetail.component';
import { AppComponent } from '../components/app.component';
import { AuthGuardService as AuthService } from '../services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'jobs',
    canActivate: [AuthService],
    component: JobsComponent
  },
  {
    path: 'jobs/:id',
    canActivate: [AuthService],
    component: JobDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing = RouterModule.forRoot(routes);
