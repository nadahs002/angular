import { Grade } from './../model/grade.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-grade',
  templateUrl: './update-grade.component.html',
  styleUrls: ['./update-grade.component.css']
})
export class UpdateGradeComponent implements OnInit {
  @Input()
  grade! : Grade;
  
  @Output()
  gradeUpdated = new EventEmitter<Grade>();


  @Input()
  ajout!:boolean
  
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.grade);
    }





    saveGrade(){
      this.gradeUpdated.emit(this.grade);
      }
      
    

}
