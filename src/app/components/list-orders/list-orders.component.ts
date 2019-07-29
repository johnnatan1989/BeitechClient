import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { Order } from 'src/app/models/order';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { OrderDetail } from 'src/app/models/order-detail';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  public orders: Order;
  public ordersDetail: OrderDetail;
  public dataTable: any;
  public customerSelected: Customer;
  public isCustomerSelected: boolean = false;
  @Output() public showAddOrder = new EventEmitter<Customer>();

  constructor(private orderService: OrderServiceService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  async getCustomerSelected(customer: Customer) {
    this.customerSelected = customer;
    await this.getOrderByCustomerId(customer.id);
    await this.updateTable();
  }

  public addOrder() {
    this.showAddOrder.emit(this.customerSelected);
  }

  /********DataTable */
  async populateOrderTable() {
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = await table.DataTable({
      "scrollX": true,
      "pagingType": "simple_numbers",
      "bLengthChange": false
    });
  }

  updateTable() {
    if (this.dataTable != undefined) {
      this.dataTable.destroy();
    }
    this.populateOrderTable();
  }

  /*************WEB CLIENT */
  async getOrderByCustomerId(customerId: number) {
    this.orders = await this.orderService.getOrderByIdCustomer(customerId);
    if (this.orders != undefined) {
      this.isCustomerSelected = true;
    } else {
      this.isCustomerSelected = false;
    }
  }

}
