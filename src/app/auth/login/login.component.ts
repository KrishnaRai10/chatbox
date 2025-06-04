import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../services/main.services';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;
  email: string = '';
  password: string = '';
  constructor(private router: Router, private authService: AuthService, private toast: ToastrService, private service: MainService) { }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login(): void {
    this.service.handelLoader(true);
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();

    // Basic form validation
    if (!trimmedEmail || !trimmedPassword) {
      this.toast.info('Please fill in all fields.');
      return;
    }
    let credential = {
      email: trimmedEmail,
      password: trimmedPassword,
    }
    this.authService.login(credential).subscribe((res) => {
      if (res) {
        this.toast.success(res.message);
        this.router.navigate(['chat']);
        this.service.handelLoader(false);
      }
    })
  }
}
