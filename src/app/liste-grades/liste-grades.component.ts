import { Grade } from './../model/grade.model';
import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../services/employe.service';



@Component({
  selector: 'app-liste-grades',
  templateUrl: './liste-grades.component.html',
  styleUrls: ['./liste-grades.component.css']
})
export class ListeGradesComponent implements OnInit {
  grade! : Grade[];
  updatedG :Grade = {"idG":0,"nomG":""};

  constructor(private employeService : EmployeService) { }
  ngOnInit(): void {

  this.employeService.listeGrades().subscribe(grade => {this.grade = grade;
    console.log(this.grade);
    });
  }


  gradeUpdated(d:Grade){
    console.log("Cat updated event",d);
    this.employeService.ajouterGrade(d).
     subscribe( ()=> this.chargerGrades());
    }




      chargerGrades(){
        this.employeService.listeGrade().subscribe(g=> {
        
        this.grade = g;
        }); 
        }



     updateG(g:Grade){
      this.updatedG=g ;
     } 
}
