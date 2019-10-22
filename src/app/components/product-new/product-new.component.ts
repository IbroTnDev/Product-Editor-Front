import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../shared/data_services/data.service';
import {IProduct, IDescription} from '../../shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html'
})
export class ProductNewComponent implements OnInit {

  @ViewChild('d1', {static: false}) d1: ElementRef;
  products: IProduct[];
  productCreated: false;
  description: IDescription[];
  form: FormGroup;
  dta: IProduct;
  idProd: number;
  idDesc: number;
  detailHtml: any = `<div class="col-md-5">
                      <label class="control-label">key: </label>
                      <input type="text" class="form-control" formControlName="key" placeholder="Detail Key">
                    </div>
                    <div class="col-md-4" style="margin-left: 55px;">
                      <label class="control-label" >value: </label>
                      <input type="text" class="form-control" formControlName="value" placeholder="Detail Value">
                    </div>`;

  constructor(private dataService: DataService,
              private location: Location,
              public fb: FormBuilder) {
                this.form = this.fb.group(
                  {
                  name: [''],
                  category: [''],
                  code: [],
                  price: [],
                  key: [''],
                  value: ['']
                }
              );
              }

  ngOnInit() {
    this.dataService.productsList()
    .subscribe(response => {
      this.products = response;
      const max = this.products.length;
      this.dta = this.products[max - 1];
      if (this.dta === undefined) {
        this.idProd = 1;
      } else {
        this.idProd = this.dta.id + 1;
      }
      console.log(this.idProd);
  },
  error => {
       console.log('Failed to load Products.' + error);
  });
  }

  addProduct() {
  const data = [{
      id: this.idProd,
      name: this.form.get('name').value,
      category: this.form.get('category').value,
      code: this.form.get('code').value,
      price: this.form.get('price').value
      },
      {
      id: 1,
      description_id: this.idProd,
      key: this.form.get('key').value,
      value: this.form.get('value').value
  }];

  console.log(data);
  this.dataService.createProduct(data)
  .subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
  this.goBack();
}


addDetails() {
  this.d1.nativeElement.innerHTML = this.detailHtml;
}

 goBack(): void {
  this.location.back();
}
}
