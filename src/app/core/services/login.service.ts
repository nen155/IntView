import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getLogin(email: string, password: string) { 
    return this.http.post(environment.api + "login", { 
      email: email,
      password: password
    });
  }

  register(name: string, surname: string, email: string, password: string, confirmation: string) { 
    return this.http.post(environment.api + "register", { 
      name: name,
      surname: surname,
      email: email,
      password: password,
      password_confirmation: confirmation
    });
  }

  registerUserAndBusiness(name: string, surname: string, email: string, password: string, confirmation: string, business_name: string, business_email: string, business_cif: string, business_address: string, business_phone: string, recaptcha: string) {
    return this.http.post(environment.api + "register-user-business", { 
      name: name,
      surname: surname,
      email: email,
      password: password,
      password_confirmation: confirmation,
      business_name: business_name,
      business_email: business_email,
      business_cif: business_cif,
      business_address: business_address,
      business_phone: business_phone,
      recaptcha: recaptcha
    });
  }
}
