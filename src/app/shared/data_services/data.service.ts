import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import {IProduct, IDescription} from '../interfaces';
import { ConfigService } from '../api_settings/config.service';

@Injectable()
export class DataService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private options = { headers: this.headers };
    private baseUrl = '';

    constructor(private httpClient: HttpClient,
                private configService: ConfigService) {
        this.baseUrl = this.configService.getApiURI();
    }

    // get all Products
getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.baseUrl + 'products', this.options).pipe(
        retry(3),
        catchError(this.handleError));
}

productsList(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.baseUrl + 'productsList', this.options).pipe(
        retry(3),
        catchError(this.handleError));
}

// get a specific product by Id
getProduct(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(this.baseUrl + 'products/' + id ).pipe(
        retry(3),
        catchError(this.handleError));
}

// create a new product
createProduct(product: any) {
    return this.httpClient.post<any>(this.baseUrl + 'products', product);
}

// updates a product
updateProduct(product: any) {
    return this.httpClient.put(this.baseUrl + 'products/' + product.id, product);
}

// delete product
deleteProduct(id: number): Observable<{}> {
    return this.httpClient.delete(this.baseUrl + 'products/' + id, {headers: this.headers})
    .pipe(
        catchError(this.handleError));
}

// get products for typeahead token
retrieveProducts(term: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(this.baseUrl + 'products/search/' + term ).pipe();
}

private handleError(error: Error | HttpErrorResponse): Observable<never> {
    let log = 'Unexpected error';

    if (error instanceof HttpErrorResponse) {
      if (error.error && typeof error.error.errorMessage === 'string') {
        log = error.error.errorMessage;
      } else {
        log = error.message;
      }
    } else if (error instanceof Error) {
      log = error.toString();
    }

    console.error(log);
    return throwError(error);
  }
}
