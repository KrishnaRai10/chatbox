import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../services/main.services';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(private router: Router, private authService: AuthService, private toast: ToastrService, private service: MainService) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  register(): void {
    this.service.handelLoader(true);
    const trimmedUsername = this.username.trim();
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();
    const trimmedConfirmPassword = this.confirm_password.trim();

    // Basic form validation
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      alert('Please fill in all fields.');
      return;
    }
    let credential = {
      username: trimmedUsername,
      email: trimmedEmail,
      password: trimmedPassword,
      password_confirmation: trimmedConfirmPassword,
    }
    this.authService.register(credential).subscribe((res) => {
      if (res) {
        this.toast.success(res.message);
        this.router.navigate(['chat']);
        this.service.handelLoader(false);
      }
    })
  }
}
