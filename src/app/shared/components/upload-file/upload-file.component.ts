import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.sass']
})
export class UploadFileComponent implements OnInit {
  @Output() outputFile: EventEmitter<any> = new EventEmitter()
  files: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(files) {
    this.outputFile.emit(files);
    for (let file of files) {
      this.files.push(file.name);
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
}
