import { Grade } from './grade.model';
import { Image } from './image.model';
export class employe {
    idEmploye? : number;
    nomEmploye? : string;
    salaireEmploye? : number;
    date? : Date ;
    grade! : Grade;
    image! : Image;
    imageStr!:string;
}