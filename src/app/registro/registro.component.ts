import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  email : string = '';
  password : string = '';

  constructor(private as : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }




if(this.password == '') {
  alert('Please enter password');
  return;
}


this.as.register(this.email,this.password);

this.email = '';
this.password = '';

}
}
