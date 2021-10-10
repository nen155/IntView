import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  @Input() singleQuestionForm: FormGroup;
  @Input() number: number;

  titleForm: FormControl;
  descriptionForm: FormControl;
  retryForm: FormControl;
  readTimeForm: FormControl;
  importantForm: FormControl;
  answerTimeForm: FormControl;

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.titleForm = this.singleQuestionForm.get('titleForm') as FormControl;
    this.descriptionForm = this.singleQuestionForm.get('descriptionForm') as FormControl;
    this.retryForm = this.singleQuestionForm.get('retryForm') as FormControl;
    this.readTimeForm = this.singleQuestionForm.get('readTimeForm') as FormControl;
    this.importantForm = this.singleQuestionForm.get('importantForm') as FormControl;
    this.answerTimeForm = this.singleQuestionForm.get('answerTimeForm') as FormControl;

  }
  @Output() removeEvent = new EventEmitter();
/*
  _title: string;
  _description: string;
  _retry: number = 0;
  _readTime: number = 30;
  _important: boolean = false;
  _answerTime: number = 60;
  @Input()
  set title(val: string){
    this.titleChange.emit(val);
    this._title = val;
  }
  get title(){
    return this._title;
  }
  @Output() titleChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set description(val: string){
    this.descriptionChange.emit(val);
    this._description = val;
  }
  get description(){
    return this._description;
  }
  @Output() descriptionChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set retry(val: number){
    this.retryChange.emit(val);
    this._retry = val;
  }
  get retry(){
    return this._retry;
  }
  @Output() retryChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set readTime(val: number){
    this.readTimeChange.emit(val);
    this._readTime = val;
  }
  get readTime(){
    return this._readTime;
  }
  @Output() readTimeChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set important(val: boolean){
    this.importantChange.emit(val);
    this._important = val;
  }
  get important(){
    return this._important;
  }
  @Output() importantChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  set answerTime(val: number){
    this.answerTimeChange.emit(val);
    this._answerTime = val;
  }
  get answerTime(){
    return this._answerTime;
  }
  @Output() answerTimeChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() removeEvent = new EventEmitter();
*/

}
