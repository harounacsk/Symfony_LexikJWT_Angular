import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerFormGroup:FormGroup;
  errorMessage:string | undefined;

  constructor(private authService:AuthService, private fb:FormBuilder, private tokenService:TokenService, private router:Router){
    this.registerFormGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])});
 
  }
  ngOnInit(): void {
    if(this.tokenService.isTokenValid())
    this.router.navigateByUrl('nav/article');
  }

  public handleSignup():void{
    const user={
      email:this.registerFormGroup.value.email,
      password:this.registerFormGroup.value.password
    };
    this.authService.signUp(user).subscribe({
      next:()=>{
        alert("Success");
      },
      error:()=>{
        alert("Error");
      }
    })
  }
}
