import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data_services/data.service';
import {IProduct, IDescription} from '../../shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-view',
  templateUrl: './product-details-view.component.html'
})
export class ProductDetailsViewComponent implements OnInit {

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

}
