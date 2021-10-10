import { Answer } from './../interfaces/answer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private http: HttpClient) { }

  getById(id:number) {
    return this.http.get<Answer>(environment.api + "candidates-interview/" + id);
  }

  getByIdCandidateAndIdInterview(idCandidate: number, idInterview: number){
    return this.http.get<Answer[]>(environment.api + "answers/" + idCandidate+"/"+idInterview);
  }

}
