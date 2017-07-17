import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form:FormGroup;

  genders = [
    { value: 'F', display: 'Female' },
    { value: 'M', display: 'Male' },
    { value: 'FE', display: 'FeeeeeMale' }
  ];

  topics = [
    { value: 'game', display: 'Gaming' },
    { value: 'tech', display: 'Technology' },
    { value: 'life', display: 'Lifestyle' },
  ];

  constructor(
      private formBuilder: FormBuilder,
      private authService:AuthService
  ) {
      this.createForm(); 
   }
  
  createForm(){
    this.form = this.formBuilder.group({
        firstname:[''],
        lastname:[''],
        gender:[''],
        topic:[ ['']]
    });
  }
  
  onRegisterSubmit(){
      const user = { 
      firstname : this.form.get('firstname').value, // Firstname input field
      lastname : this.form.get('lastname').value, // Lastname input field
      gender : this.form.get('gender').value,
      topic : this.form.get('topic').value
    }

    console.log(user);

    this.authService.registerUser(user).subscribe(data => {
      // Resposne from registration attempt
      console.log('Data');
      console.log(data);
    });

  }

  ngOnInit() {
    
  }

}
