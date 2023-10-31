import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesserviceService } from '../services/courses.service';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  course:Course;

  lessons: Lesson[];

  loading = false;

  lastPageLoaded = 0;

  displayedColumns = ['seqNo', 'description', 'duration'];




  constructor(private route: ActivatedRoute,
    private cs: CoursesserviceService) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data["course"];

      this.loading = true;

      this.cs.findLessons(this.course.id)
          .pipe(
              finalize(() => this.loading = false)
          )
          .subscribe(
              lessons => this.lessons = lessons
          );


  }


  loadMore() {

    this.lastPageLoaded++;

    this.loading = true;

    this.cs.findLessons(this.course.id, "asc",
        this.lastPageLoaded)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe(lessons => this.lessons = this.lessons.concat(lessons))

  }
}
