import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Candidate } from './../../../core/interfaces/candidate';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormAddInterviewService } from 'src/app/core/services/formAddInterview.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.sass']
})
export class InviteComponent implements OnInit {

  inviteForm: FormGroup;
  inviteFormArray: FormArray;

  constructor(private _formAddInterviewService: FormAddInterviewService, private _formBuilder: FormBuilder,private cdRef:ChangeDetectorRef){
    this.inviteFormArray = this._formBuilder.array([]);
    this.inviteForm = this._formBuilder.group({
      candidatesForm: this.inviteFormArray
    });
    this._formAddInterviewService.stepReady(this.inviteForm,'inviteForm');
   }

  ngOnInit() {
    this.inviteFormArray.push(this._formBuilder.group({
      nameForm: ['', Validators.required],
      emailForm: ['', Validators.required],
      phoneForm: ['']
    }));
    this.cdRef.detectChanges();
  }

  addCandidate(){
    this.inviteFormArray.push(this._formBuilder.group({
      nameForm: ['', Validators.required],
      emailForm: ['', Validators.required],
      phoneForm: ['']
    }));
    this.cdRef.detectChanges();;
  }
  removeCandidate(number){
    this.inviteFormArray.removeAt(number);
    this.cdRef.detectChanges();
  }

  onSubmit(){
    this._formAddInterviewService.stepReady(this.inviteForm, 'inviteForm');
  }

}
