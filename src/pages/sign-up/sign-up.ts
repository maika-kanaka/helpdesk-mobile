import { Component, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  signUpForm: FormGroup;
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    public translate: TranslateService,
    private formBuilder: FormBuilder)
  {
    this.createForm();
  }

  createForm()
  {
    this.signUpForm = this.formBuilder.group({
        fullname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirm_password: ['']
    }, {validator: this.validPasswords });
  }

  validPasswords(group: FormGroup)
  { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  get f() { return this.signUpForm.controls; }

  submitSignUp()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }


  }

}
