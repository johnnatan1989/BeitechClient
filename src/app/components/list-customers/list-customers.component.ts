import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  private customers: Customer;
  @Output() public customerSelected = new EventEmitter<Customer>();
  constructor(private customerService: CustomerServiceService) {

  }

  ngOnInit() {
    this.getCustomers();
  }

  /**ACTIONS */
  getOrderById(event,element:Customer) {
    this.customerSelected.emit(element);
  }

  /*****WEB SERVICES */
  private async getCustomers() {
    this.customers = await this.customerService.getCustomers();
  }
}
