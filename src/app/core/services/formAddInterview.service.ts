import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormAddInterviewService {

  private jobFormSource: Subject<FormGroup> = new Subject();
  public jobForm: Observable<FormGroup> = this.jobFormSource.asObservable();

  private videoPresentationSource: Subject<FormGroup> = new Subject();
  public videoPresentation: Observable<FormGroup> = this.videoPresentationSource.asObservable();

  private questionFormSource: Subject<FormGroup> = new Subject();
  public questionForm: Observable<FormGroup> = this.questionFormSource.asObservable();

  private inviteFormSource: Subject<FormGroup> = new Subject();
  public inviteForm: Observable<FormGroup> = this.inviteFormSource.asObservable();

  mainForm: FormGroup = this._formBuilder.group({
    jobTitle: [''],
    skillControl: [''],
    jobExperience: [''],
    jobDescription: [''],
    videoLink: [''],
    videoFile: [''],
    questions: this._formBuilder.array([]),
    candidates: this._formBuilder.array([])
  })

  constructor(
    private _formBuilder: FormBuilder
  ) {

    this.jobForm.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.jobTitle = val.jobTitle;
        this.mainForm.value.skillControl = val.skillControl;
        this.mainForm.value.jobExperience = val.jobExperience;
        this.mainForm.value.jobDescription = val.jobDescription;
      })
    );

    this.videoPresentation.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.videoLink = val.videoLink;
        this.mainForm.value.videoFile = val.videoFile;
      })
    );

    this.questionForm.subscribe(form =>
      form.valueChanges.subscribe(val => {
        if(val.questionsForms){
          this.mainForm.value.questions = val.questionsForms.slice();
        }
      })
    );

    this.inviteForm.subscribe(form =>
      form.valueChanges.subscribe(val => {
        if(val.candidatesForm){
          this.mainForm.value.candidates = val.candidatesForm.slice();
        }
      })
    );
  }

  stepReady(form: FormGroup, part) {
    switch (part) {
      case 'jobForm': { this.jobFormSource.next(form); }
      case 'videoPresentation': { this.videoPresentationSource.next(form); }
      case 'questionForm': { this.questionFormSource.next(form); }
      case 'inviteForm': { this.inviteFormSource.next(form); }
    }
  }
}
