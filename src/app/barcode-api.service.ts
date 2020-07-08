import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BarcodeApiService {

  private path:string = 'api.upcitemdb.com/prod/trial/lookup';

  constructor(private http: HTTP) { }

  testFun(){
      console.log('injectable');
  }

  fetchProduct(barcode:string){

      console.log('function called!');


      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
      return from(this.http.get('https://api.upcitemdb.com/prod/trial/lookup?upc='+barcode,{},{}));
  }
}
