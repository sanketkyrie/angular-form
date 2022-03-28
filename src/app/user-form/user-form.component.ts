import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Users } from '../models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  myForm : FormGroup;

  userDetails : Users[] = [];

  options = [
    'Male',
    'Female',
    'Other'
  ];

  depts = [
    'IT',
    'Marketing',
    'Accounts',
    'HR'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){
    this.myForm = this.fb.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
      phoneNo : [null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      gender : ['',[Validators.required]],
      date : ['',[Validators.required]],
      depart : ['',[Validators.required]],
      agree : [false,[Validators.requiredTrue]]
    })
    this.myForm.valueChanges.subscribe(res => {
      console.log(res);
    })
  }

  ngOnInit(): void {
  }

  get firstName(){
    return this.myForm.get('firstName');
  }
  get lastName(){
    return this.myForm.get('lastName');
  }
  get email(){
    return this.myForm.get('email');
  }
  get phoneNo(){
    return this.myForm.get('phoneNo');
  }
  get date(){
    return this.myForm.get('date');
  }
  get depart(){
    return this.myForm.get('depart');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      duration:2000
    });
  }

  onSubmit(){
    this.userDetails.push(this.myForm.value);
    console.log(this.userDetails);

    this.openSnackBar('Data has been added','done');

    //reset
    this.myForm.reset();
  }

}
