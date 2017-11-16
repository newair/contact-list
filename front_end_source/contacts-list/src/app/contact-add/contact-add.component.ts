import { NgForm } from '@angular/forms/src/directives';
import {ContactService} from '../contact.service';
import { Contact } from '../models/contact.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

/**
 * This comoponent is responsible for adding users
 */
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  contactForm: FormGroup;
  formSubmit=false;
  
  //Form controllers
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', []);  
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.pattern("^[0-9]*$")]);
  
  constructor(private contactService: ContactService) { }

  /**
   * On initintialization form will be created
   */
  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName :this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    });
  }

  // Error Messages. Only email and first name are compulsory
  // Email is validated with default @ sign. and Phone number is
  // validated with numbers only
  getInvalidEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email cannot be empty' :
        this.email.hasError('email') ? 'Not a valid email' :'';
  }

  getInvalidFirstNameErrorMessage(){
    return this.firstName.hasError('required') ? 'FirstnameS cannot be empty':'' ;
  }

  getInvalidPhoneNumberErrorMessage(){
    return this.phone.hasError('pattern') ? 'Invalid phone number':'' ;
  }
  
  /**
   * Callback on submission of the form
   * @param form 
   */
  onSubmit(form: NgForm){
    if(this.contactForm.valid){
      let formValues = this.contactForm.value;
      let contact = new Contact(
        formValues.firstName,
        (formValues.lastName||''), // Last name is kept optional
        formValues.email,
        formValues.phone
      )
      this.contactService.saveContact(contact); // request the data service to save the contact
    }
    form.resetForm();    // form is reset after sending the request
  }
}
