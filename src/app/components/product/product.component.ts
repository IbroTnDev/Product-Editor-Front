import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data_services/data.service';
import {IProduct, IDescription} from '../../shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  products: IProduct[];
  objectKeys = Object.keys;
  selectedProduct: IProduct;
  productsTpe: any[] = [];
  formType: FormGroup;
  dataProd: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProducts()
    .subscribe(response => {
      this.products = response;
      console.log('succeed to load Products.', this.products);
  },
  error => {
       console.log('Failed to load Products.' + error);
  });
  }

  removeProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.dataService.deleteProduct(this.selectedProduct.id)
        .subscribe(() => {
            console.log('Product was deleted successfully. ');
            // Reload Products after one is deleted
            this.dataService.getProducts()
            .subscribe(response => {
              this.products = response;
              console.log('succeed to load Products.', this.products);
          },
          error => {
               console.log('Failed to load Products.' + error);
          });
        },
        error => {
            console.log('Failed while trying to delete the Product. ' + error);
        });
 }

}
