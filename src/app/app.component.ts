import { Component, ViewChild, OnInit } from '@angular/core';
import { Customer } from './models/customer';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { ModalDirective } from 'angular-bootstrap-md';
import { Order } from './models/order';
import { AddOrderComponent } from './components/add-order/add-order.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BeitechStore';
  @ViewChild('listOrderChild', { static: true }) listOrderChild: ListOrdersComponent;
  @ViewChild('listCustomerChild', { static: true }) listCustomerChild: ListCustomersComponent;
  @ViewChild('addOrderChild', { static: true }) addOrderChild: AddOrderComponent;
  @ViewChild('basicModal', { static: true }) basicModal: ModalDirective;
  constructor() {

  }

  showAddOrder(customer:Customer){
    console.log(customer.name);
    this.addOrderChild.customer = customer;
    this.addOrderChild.getProductByIdCustomer();
    this.addOrderChild.updateTable();
    this.basicModal.show();
  }

  customerSelected(event: Customer) {
    this.listOrderChild.getCustomerSelected(event);
  }

  ngOnInit() { }
}
