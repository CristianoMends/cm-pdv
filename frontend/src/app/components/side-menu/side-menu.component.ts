import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private router: Router) { }

  @Input() selected = '';

  async navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
