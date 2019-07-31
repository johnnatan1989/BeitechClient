import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderToSave } from '../models/order-to-save';

@Injectable({
  providedIn: 'root'
})
export class SaveOrderService {

  constructor(private _http: HttpClient) {

  }

  protected generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }

  async saveOrder(order: OrderToSave): Promise<Order> {
    return await this._http.post<Order>(environment.ipServer + 'order/addOrder/', order,
      { headers: this.generateAuthHeaders() }).toPromise();
  }
}
