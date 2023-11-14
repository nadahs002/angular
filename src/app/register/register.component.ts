import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';
import { Router } from '@angular/router'; // Import Router
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private emloyeService: EmployeService,
    private router: Router // Inject Router
  ) { }

  user = new User();
  passConf!: string;

  ngOnInit(): void {
  }

  register() {
    if (this.user.password != this.passConf) {
      Swal.fire({
        icon: 'error',
        title: 'Password not match',
      });
      return;
    }

    this.emloyeService.Register(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'check your inbox ',
          timer: 5000
        }).then(() => {
          // After the SweetAlert is closed, navigate to the login page
          this.router.navigate(['/login']);
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}