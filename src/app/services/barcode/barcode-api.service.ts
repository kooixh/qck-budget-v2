import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BarcodeApiService {
    private url = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';

    constructor(private http: HTTP) {}

    fetchProduct(barcode: string) {
        console.log('function called!');
        return from(this.http.get(this.url + barcode, {}, {}));
    }
}
