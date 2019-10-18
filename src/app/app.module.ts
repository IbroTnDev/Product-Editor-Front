import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { DataService } from './shared/data_services/data.service';
import { ConfigService } from './shared/api_settings/config.service';
import { ProductNewComponent } from './components/product-new/product-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailsViewComponent } from './components/product-details-view/product-details-view.component';
import { SortProductsPipe } from './pipes/sort-products.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductNewComponent,
    ProductEditComponent,
    ProductDetailsViewComponent,
    SortProductsPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [DataService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
