import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

@Component({
  selector: 'app-invite-email',
  templateUrl: './invite-email.component.html',
  styleUrls: ['./invite-email.component.sass']
})
export class InviteEmailComponent implements OnInit {

  greetings = ['Dear [name]','Hi [name]', 'Hello [name]', 'Thank you [name]'];
  greeting ='Dear [name]';
  message = `Thank you for your application to join us at [companyName]! [jobTitle] is an important role for us and we are pleased that you expressed interest in fulfilling it. We would therefore like to invite you to complete a video introduction so that we can get to know you a little better.`;
  timeZone = momentTimezone.tz.guess();
  timeZones = momentTimezone.tz.names();


  constructor() { }

  ngOnInit(): void {

  }

}
