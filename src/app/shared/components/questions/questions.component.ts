import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Question } from 'src/app/core/interfaces/question';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormAddInterviewService } from 'src/app/core/services/formAddInterview.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.sass']
})
export class QuestionsComponent implements OnInit {
  questionForm: FormGroup;
  questionsFormArray: FormArray;

  constructor(private translate: TranslateService, private _formAddInterviewService: FormAddInterviewService, private _formBuilder: FormBuilder,private cdRef:ChangeDetectorRef) {
    this.questionsFormArray = this._formBuilder.array([]);
    this.questionForm = this._formBuilder.group({
      questionsForms: this.questionsFormArray
    });
    this._formAddInterviewService.stepReady(this.questionForm,'questionForm');
  }
  ngOnInit() {
    this.translate.get("questions.questionsBaseList").subscribe((quests)=>{
      quests.forEach(question => {
        this.questionsFormArray.push(this._formBuilder.group({
          titleForm: [question.title, Validators.required],
          descriptionForm: [question.description],
          retryForm: [question.retries + ''],
          readTimeForm: [question.readTime  + ''],
          importantForm: [question.important],
          answerTimeForm:[question.answerTime  + '']
        }));
      });
      this.cdRef.detectChanges();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.questionsFormArray.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.questionsFormArray.at(i + dir);
      this.questionsFormArray.setControl(i, current);
    }
    this.questionsFormArray.setControl(to, temp);
    //moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addQuestion(){
    this.questionsFormArray.push(this._formBuilder.group({
      titleForm: ['', Validators.required],
      descriptionForm: [''],
      retryForm: [''],
      readTimeForm: ['30'],
      importantForm: [false],
      answerTimeForm:['60']
    }));
    this.cdRef.detectChanges();
  }
  removeQuestion(number){
    this.questionsFormArray.removeAt(number);
    this.cdRef.detectChanges();
  }

  onSubmit(){
    this._formAddInterviewService.stepReady(this.questionForm, 'questionForm');
  }
}
