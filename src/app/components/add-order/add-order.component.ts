import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { Product } from 'src/app/models/product';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  public customer: Customer;
  public products: any;
  public productsForm: FormGroup;
  public dataTable: any;
  public total: number = 0;
  public totalPrice: number = 0;
  public quantity: number = 0;
  public check: boolean = false;
  public prodToAdd: any[] = new Array();
  public prodSelected: Product;
  public isValid: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderServiceService,
    private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initForm();
  }

  async initForm() {
    this.productsForm = new FormGroup({
      orderAddress: new FormControl(undefined, [Validators.required]),
      totalPrice: new FormControl(0),
      quantity: new FormControl([Validators.required]),
      selectProd: new FormControl([undefined])
    });
  }

  addProduct() {
    if ((this.total + Number(this.productsForm.get('quantity').value)) < 6) {
      this.total += Number(this.productsForm.get('quantity').value);
      this.totalPrice += this.productsForm.get('quantity').value * this.prodSelected.price;
      this.prodToAdd.push(this.prodSelected);
      var i = this.products.indexOf(this.prodSelected);
      if (i != -1) {
        this.products.splice(i, 1);
      }
      this.productsForm.controls["totalPrice"].setValue(this.totalPrice);
    }

  }

  onProd() {
    this.prodSelected = this.productsForm.get('selectProd').value;
  }

  /********DataTable */
  async populateProductTable() {
    this.chRef.detectChanges();
    const table: any = $('#productTable');
    this.dataTable = await table.DataTable({
      "retrieve": true,
      "scrollX": true,
      "pagingType": "simple_numbers",
      "bLengthChange": false
    });
  }

  updateTable() {
    if (this.dataTable != undefined) {
      this.dataTable.destroy();
    }
    this.populateProductTable();
  }



  /*************WEB CLIENTS **********/
  public async getProductByIdCustomer() {
    this.products = await this.orderService.getProductByIdCustomer(this.customer.id);
    this.productsForm.controls["selectProd"].setValue(this.products[0]);
  }




}
