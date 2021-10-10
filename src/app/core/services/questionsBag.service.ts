import { QuestionBag } from './../interfaces/questionBag';
import { Question } from 'src/app/core/interfaces/question';
import { Candidate } from './../interfaces/candidate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Interview } from '../interfaces/interview';

@Injectable({
  providedIn: 'root'
})
export class QuestionsBagService {

  constructor(private http: HttpClient) { }

  getQuestionBagsByIdInterview(offset: number, idInterview:number) {
    return this.http.get<QuestionBag>(environment.api+"question-bags/"+offset+"/"+idInterview);
  }

  getById(id:number) {
    return this.http.get<QuestionBag>(environment.api+"question-bag/"+id);
  }

  add(questionBag:QuestionBag, idInterview:number) {
    this.http.post(environment.api+"question-bag/"+idInterview,questionBag);
  }

  update(id:number, idInterview:number,questionBag:QuestionBag){
    this.http.put(environment.api+"question-bag/"+id+"/"+idInterview,questionBag);
  }

}
