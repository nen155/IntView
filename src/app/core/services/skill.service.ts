import { Skill } from './../interfaces/skill';
import { Candidate } from './../interfaces/candidate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Interview } from '../interfaces/interview';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkillsByIdInterview(offset: number, idInterview: number) {
    return this.http.get<Skill[]>(environment.api + "skills/" + offset+"/"+idInterview);
  }

  getSkillsByIdInterviewAndName(offset: number, idInterview: number, name: string){
    return this.http.get<Skill[]>(environment.api + "skills/" + offset+"/"+idInterview+"/"+name);
  }

  getById(id:number) {
    return this.http.get<Skill>(environment.api + "skill/" + id);
  }

  add(skill:Skill,idInterview:number) {
    return this.http.post(environment.api + "skill/"+idInterview, skill);
  }

  update(skill:Skill,idSkill:number,idInterview:number){
    return this.http.put(environment.api + "skill/"+idSkill+"/"+idInterview, skill);
  }
}
