import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormAddInterviewService } from 'src/app/core/services/formAddInterview.service';
import { InterviewService } from 'src/app/core/services/interview.service';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.sass'],
  providers: [FormAddInterviewService]
})
export class AddInterviewComponent implements OnInit {
  @ViewChild('lastStep') lastStepRef: ElementRef;

  jobForm: FormGroup;
  inviteForm: FormGroup;
  questionForm: FormGroup;
  videoPresentation: FormGroup;

  myForm: string;
  link = 'http://linkintview.com';

  constructor(private _formBuilder: FormBuilder, private _translate: TranslateService, public formAddInterviewService: FormAddInterviewService, public interviewService: InterviewService) {
    this.formAddInterviewService.jobForm.subscribe((form) => {
      this.jobForm = form;
    });

    this.formAddInterviewService.inviteForm.subscribe((form) => {
      this.inviteForm = form;
    });
    this.formAddInterviewService.questionForm.subscribe((form) => {
      this.questionForm = form;
    });
    this.formAddInterviewService.videoPresentation.subscribe((form) => {
      console.log(form);
      this.videoPresentation = form;
    });
    console.log("padre");
  }
  ngOnInit(){
    console.log("padre oninit");
  }
  onStepChange(event){
    console.log(event);
    console.log(this.lastStepRef);
    if(event.selectedStep == this.lastStepRef){
      //TODO: Enviar un email
      //Enviar los datos del formulario principal
      this.interviewService.createInterviewProcess(JSON.stringify(this.formAddInterviewService.mainForm.value))
      .subscribe((result)=>{
        console.log(result);
      });
    }
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
