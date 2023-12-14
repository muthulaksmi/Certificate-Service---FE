import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //  username: string = '';
  //  password: string = '';
  private apiUrl = "http://localhost:8080/auth/login";
  myForm!: FormGroup;
  submitted= false;
  formerror ="";
  userNameError ="";
  passwordError="";
   ngOnInit(): void {
    this.myForm = this.fb.group({ 
    
      userName:['',[Validators.required]],
        password:['',[Validators.required]],
      });
   }
  
  constructor(private fb:FormBuilder, private http: HttpClient, private router:Router){

  }
  submit(){
    const body = { 
      username: this.myForm.controls['userName'].value,
      password: this.myForm.controls['password'].value
     };
     console.log("Come here submit");
    if (this.myForm.controls['userName'].value !== "" && this.myForm.controls['password'].value !== "") {
    this.http.post(this.apiUrl, body).subscribe(
      (response) => {
        // Handle successful login response
        
        let username =  this.myForm.controls['userName'].value;
        console.log("Username before passing: ", username)
        console.log('Login successful', response);
        this.router.navigate(['/home'], {state:{name: username}});
        
      },
      (error: any) => {
        // Handle login error
        console.error('Login failed', error.error.result);
        this.formerror = error.error.result;
        this.submitted = true;
      });
    }
    else{
      this.submitted=true;
      this.formerror ="All Fields are mandatory";
    }
    
  }
  errorCheckUserName(){
    console.log("Come here");
    
    if (this.myForm.get('userName')?.hasError('required')){
      
      this.userNameError = "** UserName is required";
      this.submitted = true;
      console.log(this.formerror);
    }  
    else 
    {
      this.userNameError = "";
      this.submitted = false;
    }
  }
  errorCheckPassword(){
    console.log("come here");
    if (this.myForm.get('password')?.hasError('required')){
      this.passwordError = "** Password is required";
      this.submitted = true;
      console.log(this.passwordError);
    }  
    else
    {
      this.passwordError = "";
      this.submitted = false;
    }
  }
}


     


