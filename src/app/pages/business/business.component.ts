import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService } from '../../core/services/business.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { EditBusinessComponent } from 'src/app/shared/components/edit-business/edit-business.component';

export interface OS {
  name: string;
}


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.sass']
})
export class BusinessComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  business: any;
  business_copy: any;
  showSpinner: boolean = true;
  fileRegex: boolean = false;
  displayedColumns: string[] = ['name', 'email', 'cif', 'address', 'phone', 'created_at', 'actions'];
  searchName: string;

  constructor(private businessService: BusinessService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getBusiness();
  }

  getBusiness() {
    this.showSpinner = true;
    this.businessService.getBusiness(0).subscribe(data => {
      this.business = data.map(business => business)
      this.business_copy = data.map(business => business);
      this.business_copy = this.business_copy[0];
      this.business = new MatTableDataSource(this.business);
      this.business.sort = this.sort;
      this.hideSpinner();
    }
    );
  }

  hideSpinner() {
    setTimeout(() => this.showSpinner = false, 1000);
  }

  openEditBusiness() {
    let dialogRef = this.dialog.open(EditBusinessComponent, { width: '640px', disableClose: false, data: this.business_copy });
    dialogRef.componentInstance.onEdit.subscribe((data) => {
      if (data) {
        this.getBusiness();
      }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      dialogRef.componentInstance.onEdit.unsubscribe();
    })
  }
}
