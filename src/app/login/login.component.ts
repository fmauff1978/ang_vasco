

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{




  email : string = '';
  password : string = '';

  constructor(private auth: AuthService, private router: Router){


  }




  ngOnInit():void {}


  login() {

    if(this.email == '') {
     alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {


    console.log("botaoacionado")

    return this.auth.AuthLogin (new GoogleAuthProvider).then(()=>{

      localStorage.setItem('token','true');
      this.router.navigate(['/home']);

      },

      err=>{

        alert("algo deu errado");
        this.router.navigate(['/login']);  }



      )
    }

  


  }



