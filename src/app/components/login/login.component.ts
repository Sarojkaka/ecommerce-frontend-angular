import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      console.log('Login data:', loginData);  // Log form data before sending
  
      // Call the login service method
      this.userService.loginUser(loginData).subscribe({
        next: (user) => {
          console.log('Login successful:', user);
          // Store the user ID in localStorage
          localStorage.setItem('userId', user.id.toString());
  
          if (user.role === "ADMIN") {
            this.router.navigate(['/app/dashboard']);
          } else if (user.role === "USER") {
            this.router.navigate(['/productlist']);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid username or password');
        }
      });
    }
  }
  

  // Navigate to the registration page
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}