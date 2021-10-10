import { Question } from 'src/app/core/interfaces/question';
import { Candidate } from './../interfaces/candidate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Interview } from '../interfaces/interview';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestions(offset: number) {
    return this.http.get<Question>(environment.api+"questions/"+offset);
  }

  getById(id:number) {
    return this.http.get<Question>(environment.api+"question/"+id);
  }

  add(question:Question) {
    this.http.post(environment.api+"question",question);
  }

  update(id:number,question:Question){
    this.http.put(environment.api+"question/"+id,question)
  }

}
