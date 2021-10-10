import { FormGroup, FormBuilder } from '@angular/forms';
import { FormAddInterviewService } from './../../../core/services/formAddInterview.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation-video',
  templateUrl: './presentation-video.component.html',
  styleUrls: ['./presentation-video.component.sass']
})
export class PresentationVideoComponent implements OnInit {

  videoPresentation: FormGroup;

  constructor(private _formAddInterviewService: FormAddInterviewService, private _formBuilder: FormBuilder) {
    this.videoPresentation = this._formBuilder.group({
      videoLink: [''],
      videoFile: ['']
    });

    this._formAddInterviewService.stepReady(this.videoPresentation,'videoPresentation');
  }

  ngOnInit() {
  }

  change(files){
    this.videoPresentation.patchValue({ videoFile: files});
  }
  onSubmit(){
    if (!this.videoPresentation.controls.videoFile.value)
      this.videoPresentation.patchValue({ videoFile: ''});
    if(!this.videoPresentation.controls.videoLink.value)
      this.videoPresentation.patchValue({ videoLink: ''});

    this._formAddInterviewService.stepReady(this.videoPresentation, 'videoPresentation');
  }
}
