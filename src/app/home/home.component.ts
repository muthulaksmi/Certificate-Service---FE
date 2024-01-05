import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  nameShrink(name: string): string {
    if (name.length > 20) {
      return (name.substring(0, 20) + "....");
    }
    return name;
  }

  associateb = false;
  disassociateb = false;

disassociate() {

  const selectedIds = [];
  for (const data of this.jsonData) {
    for (const item of data.certificates) {
      if (item.selected) {
        selectedIds.push(data.id);
      }
    }
  }
  console.log('Selected IDs:', selectedIds);  
  const data ={
    userName: this.username,
    keyStoreIds: selectedIds
  }
  console.log("Data to send: ",data);
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data // set the request body
  };
   let url = "http://localhost:8080/admin/disassociate";
  //let url = `http://localhost:8080/admin/disassociate?userName=${this.username}&keyStoreIds=${selectedIds.join(',')}`;
  //sending data to associate.
  if (selectedIds.length > 0){
  this.http.delete(url, httpOptions).subscribe(
    (response) => {
    console.log(response);      
    this.openDialog('Disassociation Successful!');
    this.myCertificate();
      
    },
    (error: any) => {
      console.log(error);
    });
  }
  else{
    this.openDialog("Select a certificate to disassociate!")
  }
}


associate() {

  const selectedIds = [];
  for (const data of this.jsonData) {
    for (const item of data.certificates) {
      if (item.selected) {
        selectedIds.push(data.id);
      }
    }
  }
  console.log('Selected IDs:', selectedIds);  
  const data ={
    userName: this.username,
    keyStoreIds: selectedIds
  }
  console.log("Data to send: ",data);
  let url = "http://localhost:8080/admin/associate";
  //sending data to associate.
  if (selectedIds.length > 0){
  this.http.post(url, data).subscribe(
    (response) => {
    console.log(response);      
    this.openDialog('Association Successful!');
    this.ListCertificate();  
    },
    (error: any) => {
      console.log(error);
    });
  }
  else {
    this.openDialog("Select a certificate to associate")
  }

}

  showHeader = false;
  viewHeader = false;
  username:string = "";
  j = 0;
  // name = "Certificate Service";
  private jsonfile = "assets/data.json";
  private jsonfile1 ="assets/data1.json";
  jsonData: any;
  jsonData1: any;
  certificateFields: string[]=[];
  certificates: string[]=[];
  constructor(private http: HttpClient,private authService: AuthService, private router:Router, public dialog: MatDialog) { }
  
  
  logout() {
    // Call authentication service for logout
    this.authService.logout();
    // Navigate to sign-in page
    this.router.navigate(['/login']);
  }



  ngOnInit() {
   this.username = this.router.lastSuccessfulNavigation?.extras.state?.['name'];
   console.log("username: ",this.username);
    if (this.username === undefined){
        this.router.navigate(['/login']);
    }
    console.log("username ", this.username, this.router.lastSuccessfulNavigation);
  }

  openDialog(msg: string): void {
    const dialogRef = this.dialog.open(DialogComponent1, {
      width: '250px',
      data: { message: msg }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  myCertificate(){

    this.associateb = false;
    this.disassociateb = true;  
    this.viewHeader = false;
    this.showHeader = true;
    this.jsonData ="";
    const url = "http://localhost:8080/auth/getmycertificates?userName="+this.username; 
    console.log(url);
    this.getData(url).subscribe(
      (data) => {
        this.jsonData = data;
        console.log(data);
        
      },
      (error) => {
        console.error('Error:', error.message);
      }
    );

    
    // change this code for list certificate name

    // this.getJsonData().subscribe(data => {
    //   this.jsonData = data;
    //   console.log(this.jsonData); 
    //   // this.name = "My Certificate"
    // });
  }
  
  getJsonData(): Observable<any> {
    return this.http.get(this.jsonfile);
  }
  getJsonData1(): Observable<any> {
    return this.http.get(this.jsonfile1);
  }
  viewCertificate(name: any){

     this.viewHeader = true;

    // // change this code for view the particular certificate
    console.log("view certificate : ", name);
    const url = "http://localhost:8080/certificates/"+name; 
    this.getData(url).subscribe(
      (data) => {
        this.jsonData1 = data;
        this.certificateFields = Object.keys(this.jsonData1.certificates[0]);
        this.certificates = this.jsonData.certificates;
        console.log('Data received:', this.jsonData);
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    

    // Extract certificates
    


    //  this.getJsonData1().subscribe(data => {
    //   this.jsonData1 = data;
    //   console.log("Come here json data 1");
    //   console.log(this.jsonData1);
    //   // this.name = "View Certificate";
    // });


  }
  
  getData(url: string): Observable<any> {
    
    return this.http.get<any>(url);
  }
  

  ListCertificate(){
   
    // Example of how to use the getData method:
    this.associateb = true;
    this.disassociateb = false;
    this.showHeader = true;
    this.viewHeader = false;
    const url = "http://localhost:8080/certificates?userName="+this.username; 
    this.getData(url).subscribe(
      (data) => {
        this.jsonData = data;
        console.log(data);
        console.log('Data received:', this.jsonData[0].certificates[0].alias);
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }




   getObjectEntries(obj: any): [string, any][] {
     return Object.entries(obj);
   }

  }




  @Component({
    selector: 'app-dialog',
    template: `
      <!-- <h2 mat-dialog-title>Success</h2> -->
      <mat-dialog-content style="color:black"><b>
        {{ data.message }}</b>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onNoClick()">OK</button>
      </mat-dialog-actions>
    `,
    
    

  })
  export class DialogComponent1 {
  
    constructor(
      public dialogRef: MatDialogRef<DialogComponent1>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router
    ) { }
  
    onNoClick(): void {
      this.dialogRef.close();
      
      //Close the dialog
    }
  }
  
