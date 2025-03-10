import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Token from '../../interface/Token';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'usuario@gmail.com';
  password: string = 'senha123';
  isLogin = true;
  @Output() signUp = new EventEmitter<void>();
  firstName: any;
  lastName: any;
  username: any;
  phone: any;
  confirmPassword: any;
  isLoginFailed: boolean = false;


  constructor(private authService: AuthService) { }

  onLogin() {
    if (this.email && this.password) {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: (res:Token) => {
          window.location.href = '/sales';
        },
        error: () => {
          this.isLoginFailed = true;
        }
      });
    }
  }
  onRegister() {
    if (this.email && this.password) {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: () => {
          window.location.href = '/sales';
        },
        error: () => {

        }
      });
    }
  }

  onSignUp() {
    this.isLogin = false;
    this.signUp.emit();
  }
  onEnter() {
    this.isLogin = true;
    this.signUp.emit();
  }
}
