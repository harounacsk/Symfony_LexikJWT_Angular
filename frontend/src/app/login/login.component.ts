import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup:FormGroup;
  errorMessage:string | undefined;

  constructor(private authService:AuthService, private fb:FormBuilder, private tokenService:TokenService, private router:Router){
    this.loginFormGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])});
 
  }
  ngOnInit(): void {
    if(this.tokenService.isTokenValid())
    this.router.navigateByUrl('nav/article');
  }

  public handleSignIn():void{
    const login={
      email:this.loginFormGroup.value.email,
      password:this.loginFormGroup.value.password
    };
    this.authService.signIn(login).subscribe({
      next:(data)=>{
        this.tokenService.saveToken(data.token);
        this.router.navigateByUrl('nav/article');
      },
      error:()=>{
        this.errorMessage="invalid email or password";
      }
    })
  }
}
