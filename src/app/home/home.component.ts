import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CoursesserviceService } from '../services/courses.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  courses$: Observable<Course[]>;

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private router: Router, private coursesService: CoursesserviceService, public User: UserService) {

    }

    ngOnInit() {

      this.reloadCourses ();

    }

reloadCourses(){

this.beginnersCourses$ = this.coursesService.loadCoursesbyCategory("BEGINNER");
this.advancedCourses$ = this.coursesService.loadCoursesbyCategory("ADVANCED");



}

}
