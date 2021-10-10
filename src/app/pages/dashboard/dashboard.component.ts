import { CandidacysService } from './../../core/services/candidacys.service';
import { InterviewService } from './../../core/services/interview.service';
import { CandidatesService } from './../../core/services/candidates.service';
import { Interview } from '../../core/interfaces/interview';
import { Component, OnInit } from '@angular/core';
import { Candidacy } from 'src/app/core/interfaces/candidacy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  interviews:Array<Interview>;
  candidacys:Array<Candidacy>;

  constructor(private interviewService: InterviewService, private candidacysService: CandidacysService) { }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates(){
    this.interviewService.getInterviews(0)
    .subscribe(interviews => {
      interviews.forEach(interview => {
        this.candidacysService.getCandidacysByIdInterview(interview.id,0)
        .subscribe(candidacys => {
          this.candidacys.push()
          //this.candidacys = ;
        });
      })

      this.interviews = interviews.slice();
      console.log(interviews)
    });
  }

}
