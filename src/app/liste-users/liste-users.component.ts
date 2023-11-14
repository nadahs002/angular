import { employe } from './../model/employe.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';
import { EmployeService } from '../services/employe.service';
import { Role } from '../model/Role';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements OnInit{

  users? : User[]; 
  roles?: Role[];
  constructor(public authService: AuthService, private employeService: EmployeService) {}

  ngOnInit(): void {
    this.chargerUsers();
  }

  chargerUsers(){
    this.employeService.listeUser().
    subscribe((users:any)=>{
    console.log(users);
    this.users=users;
    });
    }

    supprimerUser(user: User)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
  this.employeService.supprimerUser(user.user_id).subscribe(() => {
        console.log("user supprimé");
        this.chargerUsers();     
      
});
}
}