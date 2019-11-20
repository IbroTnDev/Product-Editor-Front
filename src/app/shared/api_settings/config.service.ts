import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    apiURI: string;

    constructor() {
        this.apiURI = 'http://localhost:9000/';
//        this.apiURI = 'https://jsonplaceholder.typicode.com/posts';
     }

     getApiURI() {
         return this.apiURI;
     }
}
