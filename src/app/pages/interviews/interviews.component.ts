import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ArchiveInterviewComponent } from './../../shared/components/archive-interview/archive-interview.component';
import { InterviewService } from './../../core/services/interview.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Interview } from 'src/app/core/interfaces/interview';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.sass']
})
export class InterviewsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  interviews: any;
  showSpinner: boolean;
  displayedColumns: string[] = [ 'title', 'created_by', 'created_at', 'candidates', 'actions'];
  numberInterviews:number;

  constructor(private interviewService: InterviewService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getInterviews();
  }

  getInterviews() {
    this.showSpinner = true;
    this.interviewService.getInterviews(0).subscribe(data => {
      this.interviews = data.map(interviews => interviews)
      this.numberInterviews = this.interviews.length;
      this.interviews = new MatTableDataSource(this.interviews);
      this.interviews.sort = this.sort;
      this.hideSpinner();
    }
    );
  }

  archiveInterview(idInterview: number) {
    let dialogRef = this.dialog.open(ArchiveInterviewComponent, { width: '400px', disableClose: false, data: idInterview});
    dialogRef.componentInstance.onDelete.subscribe((data) => {
      if (data) {
        this.getInterviews();
      }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      dialogRef.componentInstance.onDelete.unsubscribe();
    })
  }

  openInterview(id){
    this.router.navigate(['/interview-progress'], {relativeTo: this.route, queryParams:{id:id}});
  }

  hideSpinner() {
    setTimeout(() => this.showSpinner = false, 1000);
  }

}
