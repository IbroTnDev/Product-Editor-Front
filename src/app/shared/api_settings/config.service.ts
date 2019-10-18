import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    apiURI: string;

    constructor() {
        this.apiURI = 'http://localhost:9000/';
     }

     getApiURI() {
         return this.apiURI;
     }
}
