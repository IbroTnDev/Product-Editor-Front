import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('d1', {static: false}) d1: ElementRef;
  form: FormGroup;
  idDetail: number;
  objectKeys = Object.keys;
  details: [];
  product: IProduct;
  id: number;
  productEdited = false;
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
        this.form.get('name').setValue(product[0].product.name);
        this.form.get('category').setValue(product[0].product.category);
        this.form.get('code').setValue(product[0].product.code);
        this.form.get('price').setValue(product[0].product.price);
        this.details = product[0].details;
    },
    error => {
        console.log('Failed while trying to load the Prodcut. ' + error);
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

    this.goBack();
    }

    addDetails() {
      this.d1.nativeElement.innerHTML = this.detailHtml;
    }

     goBack(): void {
      this.location.back();
    }
}
