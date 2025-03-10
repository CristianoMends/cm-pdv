import { NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../interface/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  isDropdownOpen: boolean = false; 
  currentUser: User | null = null;

  constructor(private authService:AuthService) {}

  ngAfterViewInit(): void {
    this.authService.getLoggedUser().subscribe({
      next: (user:User) => {
        this.currentUser = user;        
      }
    });
    
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;  // Alterna o estado do dropdown
  }

  logout(): void {
    // Aqui você pode adicionar a lógica de logout
    console.log('Usuário deslogado');
    // Exemplo: this.authService.logout();
  }
}
