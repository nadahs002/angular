import { Component, OnInit } from '@angular/core';
import { employe } from '../model/employe.model';
import { EmployeService } from '../services/employe.service';
import { ActivatedRoute , Router} from '@angular/router';
import { Grade } from '../model/grade.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {

  newEmploye = new employe();
  grade! : Grade[];
  newIdG! : number;
  newGrade! : Grade;

  uploadedImage!: File;
  imagePath: any;


  constructor(private employeService: EmployeService,
    private router : Router ,) { 
    
  }
  ngOnInit(): void {
    this.employeService.listeGrade().subscribe(grade => {this.grade = grade;
    console.log(grade);

    });
    
    }

    addEmploye(){
      
      this.employeService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.newEmploye.image=img;
      this.newEmploye.grade = this.grade.find(grade => grade.idG == this.newIdG)!;
      this.employeService
      .ajouterEmploye(this.newEmploye)
      .subscribe(() => {
      this.router.navigate(['employes']);
      });
      });

      }
    

    // addEmploye(){
      
    //   this.newEmploye.grade = this.grade.find(grade => grade.idG == this.newIdG)!;
    //   this.employeService.ajouterEmploye(this.newEmploye)
    //   .subscribe(emp => {
    //   console.log(emp);
    //   this.router.navigate(['employes']);
    //   });
    //   }

      onImageUpload(event: any) {
        this.uploadedImage = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = (_event) => { this.imagePath = reader.result; }
        }
      



}
