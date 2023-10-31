import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, catchError, concatMap, last, tap, throwError } from 'rxjs';
import { CoursesserviceService } from '../services/courses.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Course } from '../model/course';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit{

  courseId: string;
  percentageChanges$: Observable<number>;

  iconUrl: string;

  form = this.fb.group({
    description: ['', Validators.required],
    category: ["BEGINNER", Validators.required],
    url: [''],
    longDescription: ['', Validators.required],
    promo: [false],
    promoStartAt: new Date()
});

constructor(
  private fb: FormBuilder,
  private coursesService: CoursesserviceService,
  private afs: AngularFirestore,
  private router: Router,
  private storage: AngularFireStorage) {

}
uploadThumbnail(event) {

  const file: File = event.target.files[0];

  console.log(file.name);
 

  const filePath = `courses/${this.courseId}/${file.name}`;

  const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
  });

  this.percentageChanges$ = task.percentageChanges();

  task.snapshotChanges()
      .pipe(
          last(),
          concatMap(() => this.storage.ref(filePath).getDownloadURL()),
          tap(url => this.iconUrl = url),
          catchError(err => {
              console.log(err);
              alert("Could not create thumbnail url.");
              return throwError(err);
          })

      )
      .subscribe();
        }

ngOnInit() {
  this.courseId = this.afs.createId();
}
onCreateCourse() {

  const val = this.form.value;

  const newCourse: Partial<Course> = {
      description: val.description,
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
      categories: [val.category]
  };

  newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

  this.coursesService.createCourse(newCourse, this.courseId)
      .pipe(
          tap(course => {
              console.log("Created new course: ", course);
              this.router.navigateByUrl("/courses");
          }),
          catchError(err => {
              console.log(err);
              alert("Could not create the course.");
              return throwError(err);
          })
      )
      .subscribe();


}
}
