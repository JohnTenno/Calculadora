import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../../../../services/theme.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  isLoading: boolean = false;
  currentUser: {} | undefined;
  visibleLogoutDialog: boolean = false;

  constructor(
    private themeService: ThemeService,
    // private securityService: SecurityService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    // this.isLoading = true;
    // const user = await this.securityService.getCurrentUser();
    // if (!user) {
    //   throw Error('User is required');
    // }
    // this.isLoading = false;

  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.router.navigate(['login']);
    // this.securityService.logout().subscribe({
    //   next: () => {
    //     this.router.navigate(['login']);
    //   }
    // });
  }

  showLogoutDialog() {
    this.visibleLogoutDialog = true;
  }
}
