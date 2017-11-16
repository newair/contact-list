import { JsonReponse } from './JsonResponse';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Contact } from './models/contact.model';
import { Injectable } from '@angular/core';

/**
 * This service is responsible for fetching data from the server
 * and saving data.
 */
@Injectable()
export class ContactService {

  public contactSubject = new Subject<Contact>(); // This is the subject that is used
  //to push data either by the reponse of saving or getting the entire list

  constructor(private http: HttpClient) { }

  /**
   * Used to save the contact information with HTTP POST
   * @param contact 
   */
  saveContact(contact: Contact) {

    let url = environment.serverUrl;
    this.http
      .post(`${url}/save-contacts`, contact.toJSON())
      .map((response: JsonReponse) => {
        // This is done in order to adapt any server side alterations
        let data = response.data;
        if (data) {
          this.contactSubject.next(new Contact(
            (data.first_name || ''),
            (data.last_name || ''),
            (data.phone || ''),
            (data.email || '')
          ));
        } else {
          throw new Error('Empty Data Object received'); // empty objects
          // are regarded as an error
        }
      }
      ).catch(error => {
        // catch any error and notify the subject
        console.error(error)
        this.contactSubject.error(error);
        return Observable.of<Contact>();
      }).subscribe();
  }
 
  /**
   * Load all contacts with HTTP GET. 
   */
  getContacts() {
    let url = environment.serverUrl;
    this.http
      .get(`${url}/get-contacts`)
      .map((response: JsonReponse) => {
        let dataArray = response.data;
        //Since it is only one One video Object is created
        //Once the responses are received it is mapped to Contact Objects
        for (let data of dataArray) {
          this.contactSubject.next(new Contact(
            (data.first_name || ''),
            (data.last_name || ''),
            (data.phone || ''),
            (data.email || '')
          ));
        }
      }
      ).catch(error => {
        // errors are notified
        console.error(error)
        this.contactSubject.error(error);
        return Observable.of<Contact[]>();
      }).subscribe();
  }
}
