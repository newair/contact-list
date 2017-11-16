import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Contact} from './models/contact.model';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule,HttpClientTestingModule],
      providers: [ContactService,{ provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));

  it('Should next RxJS subject upon successfull saving and retreival of saved object', inject([ContactService,XHRBackend], (service: ContactService, mockBackend) => {
    let contact = new Contact('myfirstName','myLastName','myPhone','myEmail');
    const mockResponse = {"status":"success","data":JSON.stringify(contact.toJSON())};

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        // pass in new isntance of Response Options
        new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })
      ));
    });
    service.contactSubject.subscribe((contact: Contact)=>{
      expect(contact.firstName).toBe('myfirstName'); 
    },(err)=>{
      console.log(err);
    });
    service.saveContact(contact);

  }));

  it('Should next RxJS subject upon successfull retrieval of list ', inject([ContactService,XHRBackend], (service: ContactService, mockBackend) => {
    let contacts = [new Contact('myfirstName','myLastName','myPhone','myEmail').toJSON()];
    const mockResponse = {"status":"success","data":JSON.stringify(contacts)};

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        // pass in new isntance of Response Options
        new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })
      ));
    });

    service.contactSubject.subscribe((contact: Contact)=>{
      expect(contact.firstName).toBe('myfirstName'); 
    },(err)=>{
      console.log(err);
    });
    service.getContacts();

  }));

});
