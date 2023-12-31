import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, concatMap, from, map } from 'rxjs';
import { Course } from '../model/course';
import { ref } from 'firebase/storage';
import { convertSnaps } from './db-utils';
import { Lesson } from '../model/lesson';
import { OrderByDirection } from '@angular/fire/firestore/firebase';

@Injectable({
  providedIn: 'root',
})
export class CoursesserviceService {


  constructor(private db: AngularFirestore) {}

  findCourseByUrl(courseUrl: string) :
    Observable<Course | null>{

      return this.db.collection("courses", ref => ref.where("url","==", courseUrl)).get().pipe(map(results =>{const courses = convertSnaps<Course>(results);

      return courses.length == 1? courses[0] : null
    })

    )
  }


  findLessons(
    courseId: string,
    sortOrder: OrderByDirection = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.db
      .collection(`courses/${courseId}/lessons`, (ref) =>
        ref
          .orderBy('seqNo', sortOrder)
          .limit(pageSize)
          .startAfter(pageNumber * pageSize)
      )
      .get()
      .pipe(map((results) => convertSnaps<Lesson>(results)));
  }

  loadCoursesbyCategory(category: string): Observable<Course[]> {
    return this.db
      .collection('courses', (ref) =>
        ref.where('categories', 'array-contains', category).orderBy('seqNo')
      )
      .get()
      .pipe(map((result) => convertSnaps<Course>(result)));
  }

  createCourse(newCourse: Partial<Course>, courseId?: string) {
    return this.db
      .collection('courses', (ref) => ref.orderBy('seqNo', 'desc').limit(1))
      .get()
      .pipe(
        concatMap((result) => {
          const courses = convertSnaps<Course>(result);

          const lastCourseSeqNo = courses[0]?.seqNo ?? 0;

          const course = {
            ...newCourse,
            seqNo: lastCourseSeqNo + 1,
          };

          let save$: Observable<any>;

          if (courseId) {
            save$ = from(this.db.doc(`courses/${courseId}`).set(course));
          } else {
            save$ = from(this.db.collection('courses').add(course));
          }

          return save$.pipe(
            map((res) => {
              return {
                id: courseId ?? res.id,
                ...course,
              };
            })
          );
        })
      );
  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(this.db.doc(`courses/${courseId}`).update(changes));
  }
  deleteCourse(courseId: string) {
    return from(this.db.doc(`courses/${courseId}`).delete());
  }

  deleteCourseAndLessons(courseId: string) {
    return this.db
      .collection(`courses/${courseId}/lessons`)
      .get()
      .pipe(
        concatMap((results) => {
          const lessons = convertSnaps<Lesson>(results);

          const batch = this.db.firestore.batch();

          const courseRef = this.db.doc(`courses/${courseId}`).ref;

          batch.delete(courseRef);

          for (let lesson of lessons) {
            const lessonRef = this.db.doc(
              `courses/${courseId}/lessons/${lesson.id}`
            ).ref;

            batch.delete(lessonRef);
          }

          return from(batch.commit());
        })
      );
  }
}
