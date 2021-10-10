import { CommentsService } from './../../../core/services/comments.service';

import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import * as momentImported from "moment";
const moment = momentImported;
import * as uuidImported from "uuid/v4";
import { User } from 'src/app/core/interfaces/user';
const uuid = uuidImported;

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
    inputActive: boolean = false;
    inputComment: string = '';

    @Input() user: User;
    @Input() idQuestion: number;
    @Input() comments: Array<any>;
    @Output() newComment = new EventEmitter<Comment>();

    constructor(public commentService: CommentsService) {}

    ngOnInit() {

    }

    add() {
        this.commentService.addComment(this.idQuestion, this.inputComment)
        .subscribe((comment:Comment)=>{
          this.newComment.emit(comment);
        }
        );
        this.inputComment = '';
    }
}

