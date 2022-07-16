import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from './services/custom_validators';
import { FormService } from './services/form_base';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public ClientForm: FormGroup;
  public formErrors = {
    lastName: '',
    firstName: '',
    ssnKey: '',
    phone: '',
    email: '',
    ssn: '',
  };

  constructor(
    public form: FormBuilder,
    public FormService: FormService,
    public snackbar: MatSnackBar,
  ) { }

  // initiate for build component
  public ngOnInit() {
    this.buildForm();
  }

  public onSubmit() {
    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.ClientForm);

    console.log('form', this.ClientForm)
    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched 
    if (this.ClientForm.valid) {
      this.snackbar.open('Succesfully submitted a valid form. yay!', 'Close', {
        duration: 3000,
      });

      /* core code goes here !!! */
      // let formValid = true;
      // Object.values(this.classes).map(classVar => {
      //   Object.entries(classVar).map(status => {
      //     if (status[0] == "error" && status[1]) {
      //       formValid = false;
      //     }
      //   });
      // });
      // if (!formValid) {
      //   return;
      // } else {
      //   this.client.phone = this.address.formatPhoneNumber(this.client.phone);
      //   this.rest
      //     .createNewClient(this.client, this.user, this.company)
      //     .subscribe((res: any) => {
      //       let redirect = '/client/' + res._id;
      //       this.router.navigate([redirect]);
      //     },
      //       error => {
      //         // console.log(error);
      //       }
      //     );
      // }


      this.ClientForm.reset();
    } else {
      this.formErrors = this.FormService.validateForm(this.ClientForm, this.formErrors, false)
    }




  }
  // build the user edit form
  public buildForm() {
    this.ClientForm = this.form.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      ssnKey: ['', [Validators.required, CustomValidators.validateCharacters]],
      phone: ['', [Validators.required, CustomValidators.validatePhone]],
      email: ['', [Validators.required, Validators.email]],
      ssn: ['', [Validators.required, CustomValidators.validatessn]],
    });

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.ClientForm.valueChanges.subscribe((data) => {
      this.formErrors = this.FormService.validateForm(this.ClientForm, this.formErrors, true)
    });
  }
}
