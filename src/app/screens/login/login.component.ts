import { Component  } from '@angular/core';
import { Api } from '../../api/api';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  url = '';
  title: 'Atabix Angular Starter';
  email: string = '';
  password: string = '';

  constructor(
    private api: Api,
    private router: Router
  ) {}

  loginUser() {
    const credentials = {
      email: this.email,
      password: this.password,
      account: 'employee'
    }
    this.api.login(credentials).subscribe(
      () => {
        localStorage.setItem('token', 'Bearer employee');
        this.router.navigate(['/jobs']);
      },
      err => console.log(err)
    );
  }
}
