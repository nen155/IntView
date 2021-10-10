import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(offset: number) {
    return this.http.get<Comment[]>(environment.api + "comments/" + offset);
  }

  getCommentById(id: number) {
    return this.http.get<Comment>(environment.api + "comments/" + id);
  }

  addComment( id_question:number, description: string) {
    return this.http.post(environment.api + "comments", {description: description, id_question: id_question});
  }
}
