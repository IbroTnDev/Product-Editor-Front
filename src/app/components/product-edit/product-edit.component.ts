import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../shared/data_services/data.service';
import {IProduct, IDescription} from '../../shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  name: string;
  category: string;
  code: number;
  price: number;
  key: string;
  value: string;
  idDetail: number;
  objectKeys = Object.keys;
  details: [];

  product: IProduct;
  productEdited = false;

  constructor(private dataService: DataService,
              private location: Location,
              private route: ActivatedRoute,
              public fb: FormBuilder) {
                this.form = this.fb.group(
                  {
                  name: [''],
                  category: [''],
                  code: [],
                  price: [],
                  idDetail: [],
                  key: [''],
                  value: ['']
                }
              );
            }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;

    this.dataService.getProduct(this.id).subscribe((product: IProduct) => {
        console.log('Prodcut loaded with success. ', product);
        this.name = product[0].product.name;
        this.category = product[0].product.category;
        this.code = product[0].product.code;
        this.price = product[0].product.price;
        this.details = product[0].details;
    },
    error => {
        console.log('Failed while trying to load the Prodcut. '+error);
    });
  }

  updateProduct() {
/*     const data = [{
      id: this.id,
      name: this.form.get('name').value,
      category: this.form.get('category').value,
      code: this.form.get('code').value,
      price: this.form.get('price').value
      },
      {
      id: this.form.get('idDetail').value,
      description_id: this.id,
      key: this.form.get('key').value,
      value: this.form.get('value').value
    }]; */

    const data = {
      id: this.id,
      name: this.form.get('name').value,
      category: this.form.get('category').value,
      code: this.form.get('code').value,
      price: this.form.get('price').value
      };

    this.dataService.updateProduct(data)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      );

    // this.goBack();
    }

    add_details() {
    }

     goBack(): void {
      this.location.back();
    }
}
