import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function specialCharacterValidator(control: AbstractControl) {
  const specialCharPattern = /['!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

  if (specialCharPattern.test(control.value)) {
    return null;
  }

  return { specialCharacter: true };
}

function equalValues(controlName1:string, controlName2:string){
  return(control:AbstractControl) =>{
    const val1 = control.get(controlName1)?.value;
  const val2 = control.get(controlName2)?.value;

  if(val1 === val2){
    return null;
  }

  return {valuesNotEqual:true};
  };
  
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('',{
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [Validators.minLength(6), Validators.required, specialCharacterValidator]
      }),
      confirmPassword: new FormControl('',{
        validators: [Validators.minLength(6), Validators.required, specialCharacterValidator]
      })
    },
    {
      validators:[equalValues('password','confirmPassword')]
    }
    ),
    firstname: new FormControl('',{validators:[Validators.required]}),
    lastname: new FormControl('',{validators:[Validators.required]}),
    agree: new FormControl(false,{validators:[Validators.required]})
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
      this.form.controls.passwords.touched && 
      this.form.controls.passwords.dirty && 
      this.form.controls.passwords.invalid
    )
  }

  onSubmit(){
    if(this.form.invalid){
      console.log('Invalid');
      return;
    }
  }
}
