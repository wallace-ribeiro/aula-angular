import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {Headers} from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable()
export class CoisasService {
  constructor(private _http : Http) { }
       getCoisas() {
                var id = '21'
                //var json = JSON.stringify({var1: 'teste', var2: 1000});
                //var params = 'json=' + json;
                //var cabe = new Headers();
                //cabe.append('Content-Type', 'application/x-www-form-urlencoded');
                return this._http.get('http://104.248.235.252:3000/coisas/'+id).map(res => res.json()); 

                        
            }
} 
