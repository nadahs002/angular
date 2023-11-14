import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployesComponent } from './employes/employes.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { FormsModule } from '@angular/forms';
import { UpdateEmployeComponent } from './update-employe/update-employe.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RechercheParGradeComponent } from './recherche-par-grade/recherche-par-grade.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateGradeComponent } from './update-grade/update-grade.component';
import { ListeGradesComponent } from './liste-grades/liste-grades.component';
import { TokenInterceptor } from './token.interceptor';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { AddUserComponent } from './add-user/add-user.component';






@NgModule({
  declarations: [
    AppComponent,
    EmployesComponent,
    AddEmployeComponent,
    AddEmployeComponent,
    UpdateEmployeComponent,
    RechercheParGradeComponent,
    RechercheParNomComponent,
    UpdateGradeComponent,
    ListeGradesComponent,
    
          RegisterComponent,
          LoginComponent,
          ListeUsersComponent,
          AddUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
