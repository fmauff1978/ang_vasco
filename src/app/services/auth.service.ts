import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private fa: AngularFireAuth, private router: Router) { }


  //login method

  login(email: string, password: string){

    this.fa.signInWithEmailAndPassword(email,password).then(()=>{

      localStorage.setItem('token','true');
      this.router.navigate(['/home']);

    },

      err=>{

        alert("algo deu errado");
        this.router.navigate(['/login']);



    })

  }
  //register method

  register(email:string, password: string){

    this.fa.createUserWithEmailAndPassword(email,password).then(()=>{
        alert("Registro com sucesso! Você será redirecionado");
        this.router.navigate(['/home']);

    }, err=>{
      this.router.navigate(['/home']);

    })
  }


  logout(){
      this.fa.signOut().then(()=>{

        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      }, err =>{
        alert(err.message);
      })

  }



  AuthLogin(provider) {
    return this.fa
      .signInWithPopup(provider)
      .then((result) => {
        console.log('Login realizado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  forgotPassword(email : string) {
    this.fa.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    })
}
sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/verify-email']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}



}
