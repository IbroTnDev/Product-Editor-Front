import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductNewComponent } from './components/product-new/product-new.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailsViewComponent } from './components/product-details-view/product-details-view.component';


const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'product-new', component: ProductNewComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'product-view/:id', component: ProductDetailsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
