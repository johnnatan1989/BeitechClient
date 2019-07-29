import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  constructor(private _http: HttpClient ) {
  }

  protected generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  } 

  async getOrderByIdCustomer(idCustomer:number): Promise<Order> {
    return await this._http.get<Order>(environment.ipServer + 'order/customer/'+`${idCustomer}`,
    { headers: this.generateAuthHeaders() }).toPromise();
  }

  async getProductByIdCustomer(idCustomer:number):Promise<Product>{
    return await this._http.get<Product>(environment.ipServer + 'product/customer/'+`${idCustomer}`,
    { headers: this.generateAuthHeaders() }).toPromise();
  }
}
