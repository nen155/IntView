import { TranslateService } from '@ngx-translate/core';
import { QuestionsService } from './../../../core/services/questions.service';
import { FilterDialogData } from './../../../core/interfaces/filterDialogData';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Question } from 'src/app/core/interfaces/question';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-score',
  templateUrl: './filter-score.component.html',
  styleUrls: ['./filter-score.component.sass']
})
export class FilterScoreComponent implements OnInit {

  score: number;
  form: FormGroup;
  questionsList: Array<Question>;
  statesList = [];
  statesSelecteds = [];
  questionsSelecteds = [];

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FilterScoreComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FilterDialogData,
              public questionsService: QuestionsService,
              public translate: TranslateService) {
                let group = { score: [this.score, [Validators.required]], states: ['', [Validators.required]], questions: null };
                // Modal with question filter section
                if (this.data.score_question) {
                  group.questions =  ['', [Validators.required]];
                }
                // Load previous data
                if (data.states) {
                  this.statesSelecteds = data.states;
                }
                if (data.questions) {
                  this.questionsSelecteds = data.questions;
                }
                if (data.score) {
                  this.score = data.score;
                }
                this.form = this.formBuilder.group(group);
              }

  async ngOnInit() {
    //this.questionsList = await this.questionsService.getQuestionByIdInterview(this.data.idInterview);
    this.statesList = await this.translate.get('interview.states').toPromise();
  }

  get questions() {
    return this.form.get('questions');
  }

  get states() {
    return this.form.get('states');
  }

  applyFilter() {
    if (this.form.valid) {
      this.dialogRef.close({score: this.score, statesAnswer: this.statesSelecteds, questionsAnswer: this.questionsSelecteds});
    }
  }

  cancelFilter() {
    this.dialogRef.close();
  }

}
