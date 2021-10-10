import { Interview } from './../interfaces/interview';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }

  getInterviews(offset: number) {
    return this.http.get<Interview[]>(environment.api + "interviews/" + offset);
  }

  getById(id:number) {
    return this.http.get<Interview>(environment.api + "interview/" + id);
  }

  add(interview:Interview) {
    return this.http.post(environment.api + "interview", interview);
  }
  createInterviewProcess(interviewProcess){
    return this.http.post(environment.api + "create-interview-process", interviewProcess);
  }
  archive(id: string) {
    return this.http.delete(environment.api + "interview/" + id);
  }
}
