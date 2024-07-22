import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ThemeService } from "../../../../../services/theme.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  awaitingNotifications: any[] = [];

  showNotificacions: boolean = false;
  showUserInfo: boolean = false;
  currentUser: any = {};

  style = "transform: translate3d(-135px, 32px, 0px)";

  constructor(
    private router: Router,
    // private securityService: SecurityService,
    private themeService: ThemeService
  ) { }

  async ngOnInit() {
    // this.currentUser = await this.securityService.getCurrentUser();
  }

  onLogout() {
    // this.securityService.logout().subscribe(r => {
    //   this.router.navigate(['/login']);
    // });

  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
