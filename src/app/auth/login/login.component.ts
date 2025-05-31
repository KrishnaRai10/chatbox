import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login(): void {
    const trimmedUsername = this.username.trim();
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();

    // Basic form validation
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      alert('Please fill in all fields.');
      return;
    }
    this.authService.login(trimmedEmail, trimmedPassword, trimmedUsername).subscribe((res) => {
      if (res) {
        this.router.navigate(['chat']);
      }
    })
  }
}
