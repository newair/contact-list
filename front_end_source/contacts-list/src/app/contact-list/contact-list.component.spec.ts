import {Contact} from '../models/contact.model';
import { Observable, Subject } from 'rxjs/Rx';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactService } from '../contact.service';

class ContactServiceStub{
    contactSubject = new Subject<any>();
    getContacts = function(){
        return Observable.of(new Contact('myfirstName','myLastName','myPhone','myEmail'));     
    }
  }
describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactServiceStub : ContactService; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule, FlexLayoutModule],
      declarations: [ ContactListComponent ],
      providers:[ { provide: ContactService, useClass:ContactServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request data from contact service', () => {
    contactServiceStub = fixture.debugElement.injector.get(ContactService);        
    expect(component).toBeTruthy();
    let spy = spyOn(contactServiceStub,'getContacts');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call array\'s unshift', () => {
    contactServiceStub = fixture.debugElement.injector.get(ContactService);    
    expect(component).toBeTruthy();
    let spy = spyOn(component.contacts,'unshift');
    component.ngOnInit();
    contactServiceStub.contactSubject.next();
    expect(spy).toHaveBeenCalled();
  });

});
