import { NgForm } from '@angular/forms/src/directives';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import {ContactService} from '../contact.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddComponent } from './contact-add.component';
import { FlexLayoutModule } from '@angular/flex-layout';

class ContactServiceStub{
  saveContact = function(){
  }
}

describe('ContactAddComponent', () => {
  let component: ContactAddComponent;
  let fixture: ComponentFixture<ContactAddComponent>;
  let contactServiceStub: ContactService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule, FormsModule,  ReactiveFormsModule,
        FlexLayoutModule,HttpClientTestingModule],
      declarations: [ ContactAddComponent ],
      providers:[ { provide: ContactService, useClass:ContactServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form object', () => {
    component.ngOnInit();
    expect(component.contactForm).toBeTruthy();
  });

  it('should check required for emails ', () => {
    let spy=spyOn(component.email,'hasError');
    component.getInvalidEmailErrorMessage();
    expect(spy).toHaveBeenCalledWith('required');
  });

  it('should check if email is provided whether it is valid', () => {
    let email={
      hasError : function(conditon){
        if(conditon == 'email') return true;
        return false;
      }
    }
    component.email=<FormControl>email;
    let spy=spyOn(component.email,'hasError');
    component.getInvalidEmailErrorMessage();
    expect(spy).toHaveBeenCalledWith('email');
  });

  it('should check required for firstname ', () => {
    let spy=spyOn(component.firstName,'hasError');
    component.getInvalidFirstNameErrorMessage();
    expect(spy).toHaveBeenCalledWith('required');
  });

  it('should check phone number pattern', () => {
    let spy=spyOn(component.phone,'hasError');
    component.getInvalidPhoneNumberErrorMessage();
    expect(spy).toHaveBeenCalledWith('pattern');
  });

  it('should call service save method on submission', () => {
    component = fixture.componentInstance;
    spyOnProperty(component.contactForm, 'valid', 'get').and.returnValue(true);
    fixture.detectChanges();
    contactServiceStub = fixture.debugElement.injector.get(ContactService);
    let spy=spyOn(contactServiceStub,'saveContact');
    component.onSubmit(<NgForm>{resetForm: function(){}});
    expect(spy).toHaveBeenCalled();
  });
});
