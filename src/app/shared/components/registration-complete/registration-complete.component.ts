import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.sass']
})
export class RegistrationCompleteComponent implements OnInit {
  @Output() onAdd = new EventEmitter<any>(true);

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}
