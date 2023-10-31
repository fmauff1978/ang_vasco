import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import { CoursesserviceService} from "./courses.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CourseResolver implements Resolve<Course>{

    constructor(private cs: CoursesserviceService) {}

    

    resolve(route: ActivatedRouteSnapshot,
            _state: RouterStateSnapshot): Observable<Course> {

        const courseUrl = route.paramMap.get("courseUrl");

        return this.cs.findCourseByUrl(courseUrl);
    }

}
