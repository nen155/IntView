import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AddUserComponent } from 'src/app/shared/components/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  users: any;
  showSpinner: boolean = true;
  fileRegex: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'created_at'];
  searchName: string;

  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.showSpinner = true;
    this.usersService.getUsers(0).subscribe(data => {
      this.users = data.map(users => users)
      this.users = new MatTableDataSource(this.users);
      this.users.sort = this.sort;
      this.hideSpinner();
      }
    );
  }

  getUsersByNameOrEmail() {
    this.showSpinner = true;
    this.usersService.getUsersByNameOrEmail(0, this.searchName).subscribe(data => {
      this.users = data.map(users => users)
      this.users = new MatTableDataSource(this.users);
      this.users.sort = this.sort;
      this.hideSpinner();
    }
    );
  }

  openAddUser() {
    let dialogRef = this.dialog.open(AddUserComponent, { width: '640px', disableClose: false });
    dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.getUsers();
      }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      dialogRef.componentInstance.onAdd.unsubscribe();
    })
  }

  hideSpinner() {
    setTimeout(() => this.showSpinner = false, 1000);
  }
}
