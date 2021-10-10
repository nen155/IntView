import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(offset: number) {
    return this.http.get<User[]>(environment.api + "users/" + offset);
  }

  getUsersByNameOrEmail(offset:number, name: string) {
    return this.http.get<User[]>(environment.api + "users/" + offset + "/" + name);
  }

  getUser(){
    return this.http.get<User>(environment.api + "user-data");
  }

  register(name: string, surname: string, email: string, password: string, confirmation: string) {
    return this.http.post(environment.api + "register-private", {
      name: name,
      surname: surname,
      email: email,
      password: password,
      password_confirmation: confirmation
    });
  }
}
