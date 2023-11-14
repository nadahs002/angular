import { employe } from './../model/employe.model';
import { Component, OnInit } from '@angular/core';

import { Grade } from '../model/grade.model';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit {
  employes !: employe[];
  nomEmploye!: string;
  grades!: Grade[] ;
  allEmployes !: employe[];
  searchTerm!: string;

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.employeService.listeEmployes().subscribe(emps => {
    console.log(emps);
    this.allEmployes = emps;
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

      rechercherEmps(){
        this.employeService.rechercherParNom(this.nomEmploye).
        subscribe(emps => {
        this.employes = emps; 
        console.log(emps)});
        }


        onKeyUp(filterText : string){
          this.employes = this.allEmployes.filter(item =>
          item.nomEmploye!.toLowerCase().includes(filterText));
          }

}
