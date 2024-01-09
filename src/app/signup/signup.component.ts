import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {

  reset() {
    console.log("Error here");
    this.myForm.get('firstName')?.setValue('');
    this.myForm.get('lastName')?.setValue('');
    this.myForm.get('userName')?.setValue('');
    this.myForm.get('email')?.setValue('');
    this.myForm.get('password')?.setValue('');
    console.log("Error here");
    this.myForm.get('confirmPassword')?.setValue('');
    this.myForm.get('secQuestion')?.setValue('');

    this.myForm.get('answer')?.setValue('');
    this.formerror = "";
    this.firstnameerror = "";
    console.log("Error here");
    this.lastNameError = "";
    this.userNameError = "";
    this.emailError = "";
    this.passwordError = "";
    this.confirmPasswordError = "";
    this.answererror="";
    this.secError="";
  

}


  message = "";
  submitted = false;
  formerror = "";
  firstnameerror = "";
  lastNameError = "";
  userNameError = "";
  emailError = "";
  passwordError = "";
  confirmPasswordError = "";
  answererror="";
  secError="";

  myForm!: FormGroup;
  private url = 'http://localhost:8080/auth/register';

  containsLetterValidator: ValidatorFn = (control: AbstractControl) => {
    const value = control.value as string;
    if (!/[a-zA-Z]/.test(value)) {
      return { containsLetter: true };
    }
    return null;
  };

  ngOnInit(): void {

    this.myForm = this.fb.group({

       firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(20)]],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z]*$'), Validators.maxLength(20)])],
      userName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.minLength(8), Validators.maxLength(16), this.containsLetterValidator])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=(?:[^.]*.){1,2}[^.]*$)[a-zA-Z0-9._%+-]+[a-zA-Z0-9]@(gmail|yahoo|hotmail|rediffmail|ymail)\.com$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16), this.noSpacesValidator])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      secQuestion: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/), Validators.minLength(5), Validators.maxLength(20)])],
    },
      {
        validator: this.passwordMatchValidator('password', 'confirmPassword')
      });

  }
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, public dialog: MatDialog) {

  }
  errorCheckSecQuestion() {
    
    if (this.myForm.get('secQuestion')?.hasError('required')){
      this.secError ="*Required";
      this.submitted=true;
    } else {
      this.secError = "";
      this.submitted=false;
    }

  }
    

  errorCheckAnswer() {

    if (this.myForm.get('answer')?.hasError('required')) {
      this.answererror = "*Required";
      this.submitted = true;
    } 
    else if (((this.myForm.get('answer')?.hasError('pattern')) || ((this.myForm.get('answer')?.hasError('minlength')) || (this.myForm.get('answer')?.hasError('maxlength')))))
    {
      this.answererror = "*Enter valid input";
      this.submitted = true;
    }
    else {
      this.answererror = "";
      this.submitted = false;
    }

  }

  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const hasNoSpaces = /\s/.test(control.value);
    return hasNoSpaces ? { 'hasSpaces': true } : null;
  }
  passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = control.get(passwordKey);
      const confirmPasswordControl = control.get(confirmPasswordKey);

      if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
        // Passwords don't match, return an error object
        return { 'passwordMismatch': true };
      }

      // Passwords match, return null (no error)
      return null;
    };
  }

  


  errorCheckConfirmPassword() {

    if (this.myForm.get('confirmPassword')?.hasError('required')) {
      this.confirmPasswordError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else if (this.myForm.hasError('passwordMismatch')) {

      this.confirmPasswordError = "*Password doesn't match";

      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.confirmPasswordError = "";
      this.submitted = false;
    }

  }
  checkconPass() {
    if (!this.myForm.get('confirmPassword')?.hasError('required')) {
      if (!this.myForm.hasError('passwordMismatch')) {
        this.confirmPasswordError = "";
        console.log(this.formerror);
      }
      else{
        this.confirmPasswordError = "*Password doesn't match";
      }
    }
  }

  errorCheckPassword() {

    if (this.myForm.get('password')?.hasError('required')) {
      this.passwordError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    } else if (this.myForm.get('password')?.hasError('minlength') || this.myForm.get('password')?.hasError('maxlength') || this.myForm.get('password')?.hasError('hasSpaces')) {
      this.passwordError = "*Enter Valid Input";
      console.log(this.formerror);
      this.submitted = true;
    } else {
      this.passwordError = "";
      this.submitted = false;
    }
    this.checkconPass();
  }



  errorCheckEmail() {


    if (this.myForm.get('email')?.hasError('pattern')) {
      this.emailError = "*Enter Valid Input";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('email')?.hasError('required')) {
      this.emailError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.emailError = "";
      this.submitted = false;
    }

  }

  errorCheckUserName() {


    if (this.myForm.get('userName')?.hasError('required')) {
      this.userNameError = "*Required";
      this.submitted = true;
      console.log(this.formerror);

    } else if (this.myForm.get('userName')?.hasError('minlength') || this.myForm.get('userName')?.hasError('maxlength') || (this.myForm.get('userName')?.hasError('pattern')) || (this.myForm.get('userName')?.hasError('containsLetter'))) {
      this.userNameError = "*Enter Valid Input";
      console.log(this.formerror);
      this.submitted = true;
    } else {
      this.userNameError = "";
      this.submitted = false;
    }

  }

  errorCheckLastName() {

    if (this.myForm.get('lastName')?.hasError('pattern') || (this.myForm.get('lastName')?.hasError('maxlength'))) {
      this.lastNameError = "*Enter valid input";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('lastName')?.hasError('required')) {
      this.lastNameError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.lastNameError = "";
      this.submitted = false;
    }

  }
  errorCheckFirstName() {

    if (this.myForm.get('firstName')?.hasError('pattern') || (this.myForm.get('firstName')?.hasError('maxlength'))) {
      this.firstnameerror = "*Enter valid input";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('firstName')?.hasError('required')) {
      this.firstnameerror = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.firstnameerror = "";
      this.submitted = false;
    }

  }
  registerUser() {
    this.formerror = "";
    const data = {
      firstName: this.myForm.controls['firstName'].value,
      lastName: this.myForm.controls['lastName'].value,
      username: this.myForm.controls['userName'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      role: "user",
      question: this.myForm.controls['secQuestion'].value,
      answer: this.myForm.controls['answer'].value
    };
    console.log(data);
    // if (this.myForm.controls['firstName'].value !== "" && this.myForm.controls['lastName'].value !== "" && this.myForm.controls['userName'].value !== "" && this.myForm.controls['email'].value !== "" && this.myForm.controls['password'].value !== "" && this.myForm.controls['confirmPassword'].value !== "") {

    //  this.errorCheckFirstName();
    //  if (!this.submitted) {
    //    this.errorCheckLastName();
    //  }
    //  if (!this.submitted) {
    //    this.errorCheckUserName();
    //  }
    //  if (!this.submitted) {
    //    this.errorCheckEmail();
    //  }
    //  if (!this.submitted) {
    //    this.errorCheckPassword();
    //  }
    //  if (!this.submitted) {
    //    this.errorCheckConfirmPassword();
    //  }
    let url = 'http://localhost:8080/auth/register';
    this.http.post(url, data).subscribe((response) => {
      console.log("Come here");
      console.log("post successful: ", response);
      this.openDialog();


      //  this.dialogRef.open(PopUpComponent);
    },
      (error: any) => {
        console.log(" Error here:  ", error);
        this.submitted = true;
        console.error("Error during post: ", error);
        this.formerror = error.error.Message;
      });
    



  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: 'Registration successful!' }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }





}


@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title>Success</h2>
    <mat-dialog-content>
      Registration Successful
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
    //Close the dialog
  }
}

// function showTooltip(fields: any, string: any) {
//   throw new Error('Function not implemented.');
// }
