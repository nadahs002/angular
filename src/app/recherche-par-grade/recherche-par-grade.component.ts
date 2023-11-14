import { Component, OnInit } from '@angular/core';
import { employe } from '../model/employe.model';
import { Grade } from '../model/grade.model';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-recherche-par-grade',
  templateUrl: './recherche-par-grade.component.html',
  styleUrls: ['./recherche-par-grade.component.css']
})
export class RechercheParGradeComponent implements OnInit {

  employes !: employe[];
  IdGrade!: number;
  grades!: Grade[] ;
  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    // this.employeService.listeGrades().
    // subscribe(g => {this.grades = g._embedded.grades;
    // console.log(g);
    // });

    this.employeService.listeGrade().subscribe(grade => {this.grades = grade;
      console.log(grade);
      });
    
    }
    
    chargerEmployes(){
    this.employeService.listeEmployes().subscribe(emps => {
    console.log(emps);
    this.employes = emps;
    });
    }


  supprimerEmploye(p: employe)
      {
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.employeService.supprimerEmploye(p.idEmploye!).subscribe(() => {
      console.log("employe supprimé");
      this.chargerEmployes();
      });
      }
      
      
      onChange() {
        this.employeService.rechercherParGrades(this.IdGrade).subscribe(emps =>{this.employes=emps});
        }

}
