import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

import { Router } from '@angular/router';
import { EmployeService } from '../services/employe.service';
import { Role } from '../model/Role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  newUser = new User();
  roles!: Array<Role>;
  newIdRole!: number;
  newRoles!: Role;


  constructor(private employeService: EmployeService,
    private router: Router) { }

  ngOnInit(): void {

    this.employeService.listeRoles().
      subscribe((rols: any) => {
        console.log(rols);
        this.roles = rols;
      });
  }

  addUser(){
    this.newUser.role = this.roles.find(rol => rol.role_id == this.newIdRole)!;
    this.employeService.creerUser(this.newUser)
                      .subscribe(user => {
                      console.log(user);
                      this.router.navigate(['users']);
                      }); 
    }
}