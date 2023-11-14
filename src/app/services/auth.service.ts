import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8082/users';
  token!:string;
  constructor(private router: Router,private http : HttpClient) { }

login(user : User)
{
return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}
saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true; 
  this.decodeJWT();

  }
 
public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];

logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/login']);
}
isTokenExpired(): Boolean
{
return this.helper.isTokenExpired(this.token); }

isAdmin():Boolean{
  if (!this.roles)
  return false;
 return this.roles.indexOf('ADMIN') >=0;
 }
setLoggedUserFromLocalStorage(login : string) {
  this.loggedUser = login;
  this.isloggedIn = true;

  }
 
  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }

  getToken():string {
    return this.token;
  }

  decodeJWT()
  { if (this.token == undefined)
    return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  getAllUsers(){
    return this.http.get<User[]>(this.apiURL+'/allUsers');
  }

  deleteUser(id : number){
    return this.http.delete<User>(this.apiURL+'/delete/'+id, {observe:'response'});
  }

  getUserById(id : number){
    return this.http.get<User>(this.apiURL+'/user/'+id);
  }

  updateUser(user : User){
    return this.http.put<User>(this.apiURL+'/Userapi/users', user, {observe:'response'});
  }

  addRoleToUser(id: number, role: Role): Observable<User> {
    const url = `${this.apiURL}/addRole/${id}`;
    return this.http.post<User>(url, role);
  }
  

                   
}
