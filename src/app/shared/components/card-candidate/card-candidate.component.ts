import { Candidate } from './../../../core/interfaces/candidate';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.sass']
})
export class CardCandidateComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('candidate') candidate: Candidate;
  @Input() idInterview: number;
  starColor = "accent";
  starCount = 5;

  onRatingChanged($event){
    this.candidate.score = $event
  }
  constructor( public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  openInterview(){
    this.router.navigate(['/interview'], {relativeTo: this.route, queryParams:{idCandidate:this.candidate.id, idInterview: this.idInterview}});
  }

}
