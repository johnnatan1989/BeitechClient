import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private _http: HttpClient) {
  }

  protected generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  } 

  async getCustomers(): Promise<Customer> {
    return await this._http.get<Customer>(environment.ipServer + 'customer',
    { headers: this.generateAuthHeaders() }).toPromise();
  }
}
