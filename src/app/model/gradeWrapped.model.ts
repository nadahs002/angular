import { Grade } from './grade.model';
export class gradeWrapper{
_embedded!: { grades: Grade[]};
}