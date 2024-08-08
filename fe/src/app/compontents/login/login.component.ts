import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatError, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AppUserAuth } from '../../shared/models/app-user-auth.model';
import { User } from '../../shared/models/user.model';
import { SecurityService } from '../../shared/security/security.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule, MatToolbarModule, MatLabel, MatError, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  user: User = new User();
  securityObject: AppUserAuth | null = null;

  constructor(private securityService: SecurityService,private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngAfterViewInit(){
    this.loginForm.get('email')?.valueChanges.subscribe(email=>this.user.email = email);
    this.loginForm.get('password')?.valueChanges.subscribe(password=>this.user.password = password);
  }  
  
  login(){
    this.securityService.login(this.user).subscribe((user)=>{
      this.securityObject = user;
      this.router.navigate(['chat'])     
    })
  }  
}
