import { Candidate } from './../interfaces/candidate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Candidacy } from '../interfaces/candidacy';

@Injectable({
  providedIn: 'root'
})
export class CandidacysService {

  constructor(private http: HttpClient) { }

  getById(id:number) {
    return this.http.get<Candidacy>(environment.api + "candidates-interview/" + id);
  }
  getCandidacysByIdInterview(idInterview:number, offset:number){
    return this.http.get<Candidacy[]>(environment.api + "candidates-interviews/"+ offset + "/" + idInterview);
  }
  add(candidacy:Candidacy, idCandidate:number, idInterview:number) {
    return this.http.post(environment.api + "candidate-interview/"+idInterview+"/"+idCandidate, candidacy);
  }
  accept(hash:string){
    return this.http.put(environment.api + "candidate-interview/accept/"+hash,'');
  }
  update(id:number,candidacy:Candidacy){
    return this.http.put(environment.api + "candidate-interview/update/"+id, candidacy);
  }
  updateState(id:number, state:string){
    return this.http.put(environment.api + "candidate-interview/update/"+id, { hire_state: state });
  }
}
