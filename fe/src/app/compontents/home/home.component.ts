import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { SecurityService } from '../../shared/security/security.service';
import { AppUserAuth } from '../../shared/models/app-user-auth.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, NavbarComponent, FooterComponent,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isUserLoggedIn: boolean = false;
  user!: AppUserAuth | null;

  constructor(private securityService: SecurityService, private router: Router){}

  ngOnInit(){
    this.securityService.user.asObservable().subscribe( (res: AppUserAuth | null) =>  {
      this.isUserLoggedIn = !!res;
      this.user = res
    });
  }

  navigateToLoginPage(){
    this.router.navigate(['/', 'login'])
  }
}
