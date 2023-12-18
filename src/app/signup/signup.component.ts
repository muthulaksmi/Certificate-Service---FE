import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
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
  message = "";
  submitted = false;
  formerror = "";
  firstnameerror = "";
  lastNameError = "";
  userNameError = "";
  emailError = "";
  passwordError = "";
  confirmPasswordError = "";



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
      //firstName: ['', Validators.compose([Validators.required, this.firstNameValidator])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z]*$'), Validators.maxLength(20)])],
      userName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.minLength(8), Validators.maxLength(16), this.containsLetterValidator])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=(?:[^.]*.){1,2}[^.]*$)[a-zA-Z0-9._%+-]+[a-zA-Z0-9]@(gmail|yahoo|hotmail|rediffmail|ymail)\.com$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16), this.noSpacesValidator])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    },
      {
        validator: this.passwordMatchValidator('password', 'confirmPassword')
      });

  }
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, public dialog: MatDialog) {

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

  firstNameValidator(control: AbstractControl): ValidationErrors | null {
    console.log("Come here");
    const value = control.value as string;
    const hasMaxLength = value.length <= 20;
    const isRequired = !!value.trim();
    const chartest = /^[a-zA-Z]*$/.test(value);
    const isValid = hasMaxLength && isRequired && chartest;
    return isValid ? null : { 'firstNameCheck': true };
  }

  getErrorMessage(controlName: string) {
    const control = this.myForm.get(controlName);
    if (control?.hasError('required')) {
      this.firstnameerror = 'Required';

    } else if ((control?.hasError('maxlength')) || (control?.hasError('pattern'))) {
      this.firstnameerror = 'Provide a valid input (only letters allowed)';
    } else
      this.firstnameerror = "";
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
        console.log("Come here");
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
      this.passwordError = "Enter Valid Input";
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
      this.userNameError = "Enter Valid Input";
      console.log(this.formerror);
      this.submitted = true;
    } else {
      this.userNameError = "";
      this.submitted = false;
    }

  }
  // errorCheckFirstName() {

  //   if (this.myForm.get('firstName')?.hasError('required')) {
  //     this.firstnameerror = "*Required";
  //     this.submitted = true;
  //   } else if (this.myForm.get('firstName')?.hasError('pattern') || this.myForm.get('firstName')?.hasError('maxlength')) {
  //     this.firstnameerror = "Enter valid input";
  //     this.submitted = true;

  //   }
  //   else {
  //     this.firstnameerror = "";
  //     this.submitted = false;
  //   }

  // }
  errorCheckLastName() {

    if (this.myForm.get('lastName')?.hasError('pattern') || (this.myForm.get('lastName')?.hasError('maxlength'))) {
      this.lastNameError = "Enter valid input";
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
      this.firstnameerror = "Enter valid input";
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
    };

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
        console.error("Error during post: ", error.error.Message);
        this.formerror = error.error.Message;
      });
    // }



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
