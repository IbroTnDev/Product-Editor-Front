import { Component } from '@angular/core';
import { DataService } from './shared/data_services/data.service';
import {IProduct, IDescription} from './shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product-Manager-Front';
  productsData: any[] = [];
  dataProd: string;
  nameToken: string;
  selectedProdId: any[] = [];
  form: FormGroup;

  constructor(private dataService: DataService, private router: Router, public fb: FormBuilder) {
    this.form = this.fb.group(
      {
        nameToken: ['']
    }
  );
}

  typeaheadOnSelect(e: TypeaheadMatch): void {
      this.dataProd = e.item;
      this.router.navigate(['/product-view', this.dataProd[1]]);
      console.log('selected prod id: ', this.dataProd[1]);
  }

  checkInput(e: string) {
    console.log(e);
    if (e.length > 2) {
        this.getProducts(e);
    }
  }

  getProducts(token: string) {
    const products = [];
    this.dataService.retrieveProducts(token).subscribe(
      prod => {
        console.log(prod);
        const data = Object.values(prod);
        for (const u of data) {
          let product = u;
          product = [product[0], product[1]];
          products.push(product);
          if (products.length === data.length) {
            this.productsData = products;
        }}
      },
        error => {
            console.log(error);
      });
  }
}
