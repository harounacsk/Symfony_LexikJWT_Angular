import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DepotComponent } from './depot/depot.component';
import { ArticleComponent } from './article/article.component';
import { AddDepotComponent } from './add-depot/add-depot.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { TokenInterceptorProvider } from './interceptor/token.interceptor';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DepotComponent,
    ArticleComponent,
    AddDepotComponent,
    AddArticleComponent,
    NavComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
