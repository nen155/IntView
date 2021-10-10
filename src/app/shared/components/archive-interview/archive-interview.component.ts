import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { InterviewService } from 'src/app/core/services/interview.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-archive-interview',
  templateUrl: './archive-interview.component.html',
  styleUrls: ['./archive-interview.component.sass']
})
export class ArchiveInterviewComponent implements OnInit {

  @Output() onDelete = new EventEmitter<any>(true);

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public interviewService: InterviewService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  closeDialog() {
    this.dialog.closeAll()
  }

  archiveInterview(id: string) {
    this.interviewService.archive(id).subscribe(data => {
      if (data) {
        this.openSnackBar("¡Entrevista archivada!");
        this.onDelete.emit(true);
        this.closeDialog();
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Cerrar");
  }

}
