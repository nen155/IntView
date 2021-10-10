import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessService } from 'src/app/core/services/business.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.sass']
})
export class EditBusinessComponent implements OnInit {
  @Output() onEdit = new EventEmitter<any>(true);

  form: FormGroup;
  id: number;
  name: string;
  cif: string;
  address: string;
  phone: string;
  payment_mode: string;
  presentation_video: string;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog, public businessService: BusinessService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
      this.name = data.name;
      this.cif = data.cif;
      this.address = data.address;
      this.phone = data.phone;
      this.payment_mode = data.payment_mode;
      this.presentation_video = data.presentation_video;
      console.log(data);
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.name, [Validators.required]],
      cif: [this.cif, [Validators.required]],
      address: [this.address, [Validators.required]],
      phone: [this.phone, [Validators.required]],
      payment_mode: [this.payment_mode, [Validators.required]],
      presentation_video: [this.presentation_video, [Validators.required]]
    });
  }

  editBusiness() {
    if (this.form.valid) {
      const name = this.form.get('name').value;
      const cif = this.form.get('cif').value;
      const address = this.form.get('address').value;
      const phone = this.form.get('phone').value;
      const payment_mode = this.form.get('payment_mode').value;
      const presentation_video = this.form.get('presentation_video').value;

      this.businessService.editBusiness(this.id, name, cif, address, phone, payment_mode, presentation_video).subscribe(data => {
          if (data) {
            this.onEdit.emit(true);
            this.openSnackBar("¡Empresa editada!");
            this.closeDialog();
          }
        }
      );
    }
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Cerrar");
  }
}
