
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import {AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/compat/firestore';
import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {LoginComponent} from './login/login.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {AppRoutingModule} from './app-routing.module';
import {CourseComponent} from './course/course.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CreateUserComponent} from './create-user/create-user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';

  import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';
import { GoogleAuthProvider } from 'firebase/auth';
import { RegistroComponent } from './registro/registro.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from "@angular/fire/auth-guard";








@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    EditCourseDialogComponent,
    LoginComponent,
    CoursesCardListComponent,
    CourseComponent,
    CreateCourseComponent,
    CreateUserComponent,
    RegistroComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    AngularFireAuthModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),

    AngularFirestoreModule,
    AngularFireStorageModule,


    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
