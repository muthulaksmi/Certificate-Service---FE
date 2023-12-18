import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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
  constructor(private http: HttpClient, private router:Router) { }
  
  ngOnInit() {
   this.username = this.router.lastSuccessfulNavigation?.extras.state?.['name'];
   console.log("username: ",this.username);
    if (this.username === undefined){
        this.router.navigate(['/login']);
    }
    console.log("username ", this.username, this.router.lastSuccessfulNavigation);
  }

  myCertificate(){



    // this.showHeader = true;
    // // change this code for list certificate name

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
    this.showHeader = true;
    const url = "http://localhost:8080/certificates"; 
    this.getData(url).subscribe(
      (data) => {
        this.jsonData = data;
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
