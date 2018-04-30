import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StackExchangeService {

  private _url:string = "https://api.stackexchange.com/";

  constructor(private _http: HttpClient) { }

  // serach Text
  serach(obj: any, accessToken: string, applicationKey: string): Observable<any> {
    
    //let urlBase = this._url + "/2.2/search?order=desc&sort=activity&site=stackoverflow";
    let urlBase = this._url + "2.2/questions?order=desc&sort=activity&site=stackoverflow&key=" + applicationKey + "&access_token=" + accessToken + "&filter=!9Z(-x-Q)8";
  
    return this._http.get(urlBase, { params: obj });
  }
}
