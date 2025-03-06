import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  @Output() signUp = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login({email:this.email, password:this.password}).subscribe({
        next: () => {
          window.location.href = '/sales';
        },
        error: () => {
          this.errorMessage = 'Email ou senha inválidos';
        }
      });
    }
  }

  onSignUp() {
    this.signUp.emit();
  }
}
