import { Component, ViewChild, OnInit } from '@angular/core';
import { Customer } from './models/customer';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { ModalDirective } from 'angular-bootstrap-md';
import { Order } from './models/order';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { OrderToSave } from './models/order-to-save';
import { SaveOrderService } from './services/save-order.service';

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
  public orderToSave: OrderToSave;
  public isValid: boolean = false;
  constructor(private saveOrderService: SaveOrderService) {

  }

  showAddOrder(customer: Customer) {
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

  isReadyToSave(): boolean {
    if (this.addOrderChild.total > 1 && this.addOrderChild.productsForm.valid) {
      // console.log(this.addOrderChild.total);
      return true;
    } else {
      return false;
    }
  }

  async saveOrder() {
    this.orderToSave = this.addOrderChild.getOrderToSave();
    this.orderToSave.customerId = this.listOrderChild.customerSelected.id;
    console.log('orederToSave', this.orderToSave);
    await this.saveOrderService.saveOrder(this.orderToSave);
    await this.listOrderChild.getOrderByCustomerId(this.listOrderChild.customerSelected.id);
    await this.listOrderChild.updateTable();
    this.basicModal.hide();
  }

  hideModal() {
    this.addOrderChild.quantity = 0;
    this.addOrderChild.total = 0;
    this.basicModal.hide();
  }
}
