import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  @Output() onAdd = new EventEmitter<any>(true);

  error: string;
  form: FormGroup;
  password: string;
  email: string;
  surname: string;
  repeatPassword: string;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog, public usersService: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      surname: [this.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [this.email, [Validators.required, Validators.minLength(5), Validators.maxLength(220), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: [this.password, [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      repeatPassword: [this.repeatPassword, [Validators.required, Validators.minLength(8), Validators.maxLength(60)]]
    });
  }

  addUser() {
    if (this.form.valid) {

      const name = this.form.get('name').value;
      const surname = this.form.get('surname').value;
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      const confirmation = this.form.get('repeatPassword').value;

      if (password != confirmation) {
        this.error = "Las contraseñas no coinciden";
        return;
      }

      this.usersService.register(name, surname, email, password, confirmation).subscribe(
        (res: any) => {
          if (res.data == 'ok') {
            this.onAdd.emit(true);
            this.openSnackBar("Usuario añadido!");
            this.closeDialog();
          }
        },
        err => {
          this.error = "El usuario ya existe";
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
