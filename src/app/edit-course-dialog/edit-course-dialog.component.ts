import { CoursesserviceService } from './../services/courses.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../model/course';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {


  form: FormGroup;

  course: Course;

  constructor(private dialogRef : MatDialogRef<EditCourseDialogComponent>,private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) course: Course, private CourseService: CoursesserviceService){

    this.course = course;

    this.form = this.fb.group({

      description: [course.description, Validators.required],
      longDescription: [course.longDescription, Validators.required],
      promo: [course.promo]
  });



}

close() {
  this.dialogRef.close();

}

save() {

  const changes = this.form.value;

  this.CourseService.updateCourse(this.course.id, changes)
      .subscribe(() => {

          this.dialogRef.close(changes);

      });


}
}

