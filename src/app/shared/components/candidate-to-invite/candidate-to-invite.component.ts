import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidate-to-invite',
  templateUrl: './candidate-to-invite.component.html',
  styleUrls: ['./candidate-to-invite.component.sass']
})
export class CandidateToInviteComponent implements OnInit {
  @Input() number: number;
  @Input() singleCandidateForm: FormGroup;

  nameForm: FormControl;
  emailForm: FormControl;
  phoneForm: FormControl;


  constructor() { }

  ngOnInit() {
    this.nameForm = this.singleCandidateForm.get('nameForm') as FormControl;
    this.emailForm = this.singleCandidateForm.get('emailForm') as FormControl;
    this.phoneForm = this.singleCandidateForm.get('phoneForm') as FormControl;
  }
  @Output() removeEvent = new EventEmitter();

}
