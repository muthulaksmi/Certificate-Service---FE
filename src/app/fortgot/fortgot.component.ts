import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fortgot',
  templateUrl: './fortgot.component.html',
  styleUrl: './fortgot.component.css'
})
export class FortgotComponent implements OnInit {


 validateUser() {
    
    const data = {
      username: this.myForm.controls['userName'].value,
      question: this.myForm.controls['secQuestion'].value,
      answer: this.myForm.controls['answer'].value
    }
    let url = "http://localhost:8080/auth/securitycheck";
    this.http.post(url, data).subscribe ((response) => {
      this.router.navigate(['reset'], {state:{name: this.myForm.controls['userName'].value}});

    },
    (error: any) => {
      console.error("Error during post: ", error.error.result);
      this.formerror = error.error.result;
      this.submitted= true;
    });

  }

errorCheckUserName() {

  if (this.myForm.get('userName')?.hasError('required')){
    this.usernameError = "*Required";
    this.submitted = true;
  } else {
    this.usernameError = "";
    this.submitted = false;

  }

}

  formerror ="";
  submitted = false;
  secerror="";
  ansError ="";
  usernameError="";
  myForm!:FormGroup;
  
  ngOnInit(): void {
    this.myForm = this.fb.group({ 
      userName: ['', [Validators.required]],
      secQuestion: ['', [Validators.required]],
      answer: ['', [Validators.required]]
      
    });
  }
  errorCheckSecQuestion(){
    if(this.myForm.get('secQuestion')?.hasError('required')){
        this.secerror = "*Required";
        this.submitted=true;
    }
    else{
      this.secerror="";
      this.submitted=false;
    }
  }


  errorCheckAnswer() {
    if (this.myForm.get('answer')?.hasError('required')){
        this.ansError = "*Required";
        this.submitted=true;
    }
    else{
      this.ansError = "";
        this.submitted=false;
    }
  }


  constructor(private fb:FormBuilder, private http: HttpClient, private router:Router) {  
            
  }
  


 

}
  

