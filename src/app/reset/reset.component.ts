import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})

export class ResetComponent implements OnInit {


  updatePassword() {
    const url = "http://localhost:8080/auth/changepassword";
    const data = {
      username: this.username,
      password: this.myForm.controls['password'].value
    }
    this.http.put(url, data).subscribe((response) =>{
      this.openDialog();
    })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent2, {
      width: '300px',
      data: { message: 'Password updated successfully!' }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  myForm!: FormGroup;
  passwordError="";
  conPasswordError = "";
  submitted = false;
  username="";
  constructor(public dialog: MatDialog, private fb: FormBuilder, private router: Router, private http: HttpClient){

  }


  ngOnInit(): void {

    this.username = this.router.lastSuccessfulNavigation?.extras.state?.['name'];
     this.myForm = this.fb.group ({
        password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16), this.noSpaceValidator])],
        conPassword: ['', Validators.compose([Validators.required])],
        },
        {
           validator: this.passwordMatchValidator('password', 'conPassword')
        });

}


passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordControl = control.get(passwordKey);
    const confirmPasswordControl = control.get(confirmPasswordKey);
    console.log(passwordControl?.value, confirmPasswordControl?.value);
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      // Passwords don't match, return an error object
      return { 'passwordMismatch': true };
    }

    // Passwords match, return null (no error)
    return null;
  };
}

errorCheckConPassword(){
  console.log("Come here");
  console.log(this.myForm.hasError('passwordMismatch'));
  if (this.myForm.get('conPassword')?.hasError('required')){
    this.conPasswordError = "*Required";
    this.submitted = true;
  }
  else if (this.myForm.hasError('passwordMismatch')){
    console.log("Come here too");
    this.conPasswordError = "*Password doesn't match";
    this.submitted = true;
  } 
  else {
    this.conPasswordError = "";
    this.submitted = false;
  }
}

noSpaceValidator(control: AbstractControl): ValidationErrors | null{

  const hasNoSpaces = /\s/.test(control.value);
  return hasNoSpaces? {'hasSpaces' :true }:  null;


}

errorCheckPassword() {
  
  if (this.myForm.get('password')?.hasError('required')){
    this.passwordError = "*Required";
    this.submitted = true;

  }
  else if(this.myForm.get('password')?.hasError('minlength') || this.myForm.get('password')?.hasError('maxlength') || this.myForm.get('password')?.hasError('hasSpaces')){
    console.log("Error here");
    this.passwordError = "*Enter Valid Input";
    this.submitted = true;

  }else {
    this.passwordError = "";
    this.submitted = false;
  }
  this.checkconPass();
} 

checkconPass() {
  if (!this.myForm.get('conPassword')?.hasError('required')) {
    if (!this.myForm.hasError('passwordMismatch')) {
      this.conPasswordError = "";
    }
    else{
      this.conPasswordError = "*Password doesn't match";
    }
  }
}

}
@Component({
  selector: 'app-dialog1',
  template: `
    <h2 mat-dialog-title>Success</h2>
    <mat-dialog-content>
      Password updated successfully!
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent2 {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent2>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
    //Close the dialog
  }
}