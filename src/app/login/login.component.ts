import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Md5} from "md5-typescript";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginName;
  passwordName;
  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('token')!==null){
      this.router.navigate(['/']);
    }
  }

    login() {
    console.log("suka");
    let url = 'http://dbhost.trelloiii.site/loginn';
     //let url='http://localhost:8090/loginn';
     //let url='http://testdb.std-763.ist.mospolytech.ru/loginn';
    this.http.post<Observable<boolean>>(url, {
      userName: Md5.init(this.loginName),
      password: Md5.init(this.passwordName)
  }).subscribe(isValid => {
      if (isValid) {
          sessionStorage.setItem(
            'token', 
            btoa(this.loginName+":"+this.passwordName)
          );
      //this.auth();
      while(sessionStorage.getItem('token')===null){}
      this.router.navigate(['/']);
      } else {
          alert("Authentication failed.")
      }
  });
}
auth() {
  let url = 'http://localhost:8090/user';

  let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  let options = { headers: headers };
  this.http.post<Observable<Object>>(url, {}, options).
      subscribe(principal => {
          console.log(principal);
          this.router.navigate(['/']);
      },
      error => {
          if(error.status == 401)
              alert('Unauthorized');
      }
  );
}

}
