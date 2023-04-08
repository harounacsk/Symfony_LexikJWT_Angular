import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private tokenService:TokenService,  private router:Router){}
  ngOnInit(): void {
  }

  public logout(){
    this.tokenService.clearToken();
    this.router.navigateByUrl('login');
  }

}
