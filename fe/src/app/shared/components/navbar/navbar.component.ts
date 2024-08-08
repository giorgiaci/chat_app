import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ]
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private securityService: SecurityService, private cdRef: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.securityService.user.asObservable().subscribe(res=>{
      this.isUserLoggedIn = !!res;
    });
  }

  goToLoginPage(){
    if(!this.isUserLoggedIn){
      this.router.navigate(['/', 'login'])
    } else {
      this.securityService.logout();
      this.router.navigate(['/'])
    }   
  }
}
