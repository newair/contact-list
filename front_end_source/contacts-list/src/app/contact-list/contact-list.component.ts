import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { Component, OnInit } from '@angular/core';

/**
 * This is the list componenet of the contact list which displays the submitted contacts
 */
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts= []; // This is bind to template
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSubject.subscribe((contact: Contact)=>{
      this.contacts.unshift(contact); //append to begining
  },(error: string)=>{
      alert(error); // inform the failure message
  });
    this.contactService.getContacts(); // Request to get the contacts
  }

}
