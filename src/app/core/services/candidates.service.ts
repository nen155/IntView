import { Candidate } from './../interfaces/candidate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Interview } from '../interfaces/interview';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }

  getCandidates(offset: number) {
    return this.http.get<Candidate[]>(environment.api + "candidates/" + offset);
    /*let candidates = [];
    this.http.get<Interview[]>(environment.testApiUrl + "interview/interview.json")
            .subscribe(interviews => candidates = interviews.map(inter => inter.candidacys.filter((candidacy)=>candidacy.)));
    return candidates;*/
  }

  getById(id:number) {
    return this.http.get<Candidate>(environment.api + "candidates/" + id);
    //return this.http.get<Candidate>(environment.api + "interview/" + id);
  }

  add(candidate:Candidate) {
    return this.http.post(environment.api + "candidate", candidate);
    //return this.http.post(environment.api + "interview", interview);
  }

  async getCandidateByIdInterview(idInterview:number,offset:number){
    return this.http.get<Candidate[]>(environment.api + "candidates-interviews/"+offset+"/"+idInterview);
    //return this.http.get<Candidate[]>(environment.testApiUrl + "candidatesInterview/candidatesInterview.json");
  }
}
