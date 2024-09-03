import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function specialCharacterValidator(control: AbstractControl) {
  const specialCharPattern = /['!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

  if (specialCharPattern.test(control.value)) {
    return null;
  }

  return { specialCharacter: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('',{
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('',{
      validators: [Validators.minLength(6), Validators.required, specialCharacterValidator]
    })
  });

  get emailIsInvalid(){
    return(
      this.form.controls.email.touched && 
      this.form.controls.email.dirty && 
      this.form.controls.email.invalid
    )
  }

  get passwordIsInvalid(){
    return(
      this.form.controls.password.touched && 
      this.form.controls.password.dirty && 
      this.form.controls.password.invalid
    )
  }

  onSubmit(){

  }
}