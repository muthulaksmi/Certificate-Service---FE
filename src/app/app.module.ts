import { NgModule } from '@angular/core';



import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TooltipDirective } from './tooltip.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent, DialogComponent } from './signup/signup.component';
import { FortgotComponent } from './fortgot/fortgot.component';
import { HomeComponent, DialogComponent1 } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewcertificateComponent } from './viewcertificate/viewcertificate.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResetComponent, DialogComponent2 } from './reset/reset.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: FortgotComponent },
  {path: 'home', component: HomeComponent},
  { path: 'reset', component: ResetComponent},
  { path: 'login', component: LoginComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FortgotComponent,
    HomeComponent,
    DialogComponent,
    ViewcertificateComponent,
    TooltipDirective,
    DialogComponent1,
    ResetComponent,
    DialogComponent2,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    

  ],

  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
