import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fortgot',
  templateUrl: './fortgot.component.html',
  styleUrl: './fortgot.component.css'
})
export class FortgotComponent implements OnInit{

  formerror ="";
  submitted = false;
  myForm!:FormGroup;
  ngOnInit(): void {
    this.myForm = this.fb.group({ 
    
      email:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[com]{3,}$/)])],
    });

  }
  constructor(private fb:FormBuilder) {  
            
  }


  errorCheckEmail(){

    
    if (this.myForm.get('email')?.hasError('pattern')){
      this.formerror = "** Please enter valid email address";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('email')?.hasError('required')){
      this.formerror = "** Email is required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else{ 
      this.formerror = "";
      this.submitted = false;
    }
  
  }

}
  function errorCheckEmail() {
    throw new Error('Function not implemented.');
  }

