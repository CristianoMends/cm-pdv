import { isPlatformBrowser, NgIf } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../interface/User';
import { MessageComponent } from "../../shared/message/message.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, MessageComponent],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  isDropdownOpen: boolean = false;
  currentUser: User | null = null;
  @ViewChild('messageComp') messageComp!: MessageComponent;
  constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (!this.authService.isValidToken()) {
      console.log('Token invalido');
      
      return;
    };

    this.authService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
      }
    });

  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;  // Alterna o estado do dropdown
  }

  onlogoutClick() {
    this.messageComp.show('Deseja deslogar?');
  }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.router.navigate(['/'])
    }
  }
}
