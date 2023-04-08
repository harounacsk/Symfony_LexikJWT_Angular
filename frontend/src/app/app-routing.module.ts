import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { AddDepotComponent } from './add-depot/add-depot.component';
import { ArticleComponent } from './article/article.component';
import { DepotComponent } from './depot/depot.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"",component:LoginComponent},
  {path:"nav",component:NavComponent,canActivate:[AuthGuard],children:[
    {path:"article",component:ArticleComponent},
    {path:"depot",component:DepotComponent},
    {path:"add_depot",component:AddDepotComponent},
    {path:"add_article",component:AddArticleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
