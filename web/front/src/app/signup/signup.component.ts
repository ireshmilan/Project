import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
        username: ['',Validators.required],
        password:['',Validators.required],
        firstName:['',Validators.required],
        lastName: ['',Validators.required],
        email: ['',Validators.required],
        address: ['',Validators.required]
        

    });


  }
  get f() {
    return this.registerForm.controls;
 }


 onSubmit() {
  


  if(this.registerForm.valid){
     alert('User form is valid!!')

   } else {
     alert('User form is not valid!! Make sure to fill the required Field');
   }
   console.log('hellow world');
   this.submitted = true;


 this.loading = true;
       // tslint:disable-next-line:max-line-length
     let  userParam = {

         "username": this.f.username.value, "password" : this.f.password.value, "firstName" : this.f.firstName.value, "lastName": this.f.lastName.value, "address": this.f.address.value, "email": this.f.email.value

       }
       this.authentication.register(userParam)
       .subscribe(
               data => {
                 console.log(data);
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });
               
             

            if(this.registerForm.valid){
              this.submitted = false;
               this.registerForm.reset();
             }
           
               
               
               

 }


  // insertData() {


  //   if(this.RegisterForm.valid){
  //    // alert('User form is valid!!') 

  //   } else {
  //    // alert('User form is not valid!! Make sure to fill the required Field');
  //   }
  //   console.log('hellow world');
  //   this.submitted = true;


  // this.loading = true;
  //       // tslint:disable-next-line:max-line-length
  //     let  userParam = {

  //         "username": this.f.username.value, "password" : this.f.password.value, "firstName" : this.f.firstname.value, "lastName": this.f.lastname.value, "email": this.f.email.value, "address": this.f.address.value

  //       }
  //       this.authentication.register(userParam)
  //       .subscribe(
  //               data => {
  //                 console.log(data);
  //               },
  //               error => {
  //                   this.error = error;
  //                   this.loading = false;
  //               });
                
              

  //            if(this.RegisterForm.valid){
  //              this.submitted = false;
  //               this.RegisterForm.reset();
  //             }
             
                
                

  // }



  }



