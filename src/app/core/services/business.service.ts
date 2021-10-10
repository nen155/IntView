import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BusinessInterface } from '../interfaces/business';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  getBusiness(offset: number) { 
    return this.http.get<BusinessInterface[]>(environment.api + "business/" + offset);
  }

  getBusinessByName(offset:number, name: string) {
    return this.http.get<BusinessInterface[]>(environment.api + "business/" + offset + "/" + name);
  }

  editBusiness(id: number,name: string, cif: string, address: string, phone: string, payment_mode: string, presentation_video: string) {
    return this.http.put(environment.api + "business/" + id,
    { 
      name: name,
      cif: cif,
      address: address,
      phone: phone,
      payment_mode: payment_mode,
      presentation_video: presentation_video
    });
  }
}
