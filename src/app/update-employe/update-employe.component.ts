import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { EmployeService } from '../services/employe.service';
import { employe } from '../model/employe.model';
import { Grade } from '../model/grade.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styles: [],
})
export class UpdateEmployeComponent implements OnInit {
  currentEmploye = new employe();
  grade! : Grade[];
  updatedGId! : number ;
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;


  constructor(private activatedRoute: ActivatedRoute,
    private employeService: EmployeService , private router :Router,
    ) { }

    ngOnInit() {
      this.employeService.listeGrade().
      subscribe(grades => {this.grade= grades;
      console.log(grades);
      });

      this.employeService.consulterEmploye(this.activatedRoute.snapshot.params['id']).
        subscribe( emp =>{ this.currentEmploye = emp; 
        this.updatedGId = 
        this.currentEmploye.grade.idG;
        } ) ;

      this.employeService
      .loadImage(this.currentEmploye.image.idImage)
      .subscribe((img: Image) => {
      this.myImage = 'data:' + img.type + ';base64,' + img.image;
      }); 
      
      }

      // updateEmploye() {
      //   this.currentEmploye.grade = this.grade.find(grade => grade.idG == this.updatedGId)!;
      //   this.employeService.updateEmploye(this.currentEmploye).subscribe(grade => {
      //   this.router.navigate(['employes']); }
      //   );
      //   }

        onImageUpload(event: any) {
          if(event.target.files && event.target.files.length) {
          this.uploadedImage = event.target.files[0];
          this.isImageUpdated =true;
          const reader = new FileReader();
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = () => { this.myImage = reader.result as string; };
          }
          }  

          updateEmploye() {
            this.currentEmploye.grade = this.grade.find(grade => grade.idG ==
            this.updatedGId)!;
            //tester si l'image du Employe a été modifiée
            if (this.isImageUpdated)
            {
            this.employeService
            .uploadImage(this.uploadedImage, this.uploadedImage.name)
            .subscribe((img: Image) => {
            this.currentEmploye.image = img;
            this.employeService
            .updateEmploye(this.currentEmploye)
            .subscribe((emp) => {
            this.router.navigate(['employes']);
            });
            });
            }
            else{
            this.employeService
            .updateEmploye(this.currentEmploye)
            .subscribe((emp) => {
            this.router.navigate(['employes']);
            });
            }
            }

}
