import { Component, ElementRef, EventEmitter, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Token from '../../interface/Token';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  email: string = 'usuario@gmail.com';
  password: string = 'senha123';
  isLogin = true;
  rememberMe: boolean = false;
  firstName: any;
  lastName: any;
  username: any;
  phone: any;
  confirmPassword: any;
  isLoginFailed: boolean = false;
  @ViewChild('loaderCompo') loader! : ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (await this.authService.hasTokenValid()) {
      this.router.navigate(['home'])
    };
  }

  onLogin() {
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login({ email: this.email, password: this.password }, this.rememberMe).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['home']);
        },
        error: () => {
          this.isLoading = false;
          this.isLoginFailed = true;
        }
      });
    }
  }
  onRegister() {
    
  }
  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
