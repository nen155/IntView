import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { State } from 'src/app/core/interfaces/state';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormAddInterviewService } from 'src/app/core/services/formAddInterview.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.sass']
})
export class JobFormComponent implements OnInit {
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  jobForm: FormGroup;
  skillControl = new FormControl();
  skills = [];
  allSkills = []; //TODO: Traer de base de datos lo que haya de habilidades ya escritas por otros usuarios
  filteredSkills: Observable<string[]>;
  experiencieList: Observable<State[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public formAddInterviewService: FormAddInterviewService,
              private _formBuilder: FormBuilder,
              private _translate: TranslateService) {

    this.filteredSkills = this.skillControl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));

    this.jobForm = this._formBuilder.group({
        jobTitle: ['', Validators.required],
        skillControl: this.skillControl,
        jobExperience: [''],
        jobDescription: ['']
      });

      this.formAddInterviewService.stepReady(this.jobForm, 'jobForm');
      console.log("jobform")
   }

  ngOnInit(): void {
    console.log("jobform onInit");
    this._translate.get("interview.experienceList").subscribe((result)=>
    this.experiencieList = result
    );
  }

  onSubmit(){
    this.skillControl.setValue(this.skills);
    this.formAddInterviewService.stepReady(this.jobForm, 'jobForm');
  }

    //#region Chips functions
  add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skillControl.setValue(null);
  }

  remove(fruit: string): void {
      const index = this.skills.indexOf(fruit);

      if (index >= 0) {
        this.skills.splice(index, 1);
      }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
      this.skills.push(event.option.viewValue);
      this.skillInput.nativeElement.value = '';
      this.skillControl.setValue(null);
  }

  private _filter(value): string[] {
      if (Array.isArray(value)) {

        return this.allSkills.filter(skill => value.filter(val => skill.toLowerCase().indexOf(val.toLowerCase()) === 0));
      } else {
        const filterValue = value.toLowerCase();

        return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
      }
  }
  //#endregion
}
