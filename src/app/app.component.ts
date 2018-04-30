import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { StackExchangeService } from './service/stack-exchange.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  stackList = [];
  page: number = 1;
  pageSize: number = 25;        // limit
  totalCount: number = 0;
  searchText: string = "";

  
  clientId: number = 12218;
  redirect_uri: string = "http://localhost:4200";
  applicationKey: string = "cTjpGnVQ4btkIvFD5Uer4w((";
  accessToken: string  = "";
  
  constructor(private _stackExchangeService: StackExchangeService) { }

  ngOnInit() {
    this.getAccessToken();
   }

  getAccessToken() {
    let currentUrl = document.location.href;
    let getIndex = currentUrl.indexOf("access_token");
    
    //console.log(getIndex);
    if(getIndex == -1) {
      let urlBase = "https://stackexchange.com/oauth/dialog?client_id=" + this.clientId + "&scope=private_info&redirect_uri=" + this.redirect_uri;

      window.open(urlBase, "_self");
    } else {
      var str = "access_token=";
      let accessTokenLength = str.length;
      let getLastIndex = currentUrl.indexOf("&");
      this.accessToken = currentUrl.substring((getIndex + accessTokenLength), getLastIndex);
    }
  }

  searchSubmitFn = function(searchData, page, pageSize) {
    //console.log(searchData);
    //debugger;
    this.searchText = searchData.intitle;
    searchData.page = page;
    searchData.pageSize = pageSize;

    this._stackExchangeService.serach(searchData, this.accessToken, this.applicationKey).subscribe(data => {
        //console.log(data);
        this.stackList = data.items; 
        this.totalCount = data.total;
      },
      (err: HttpErrorResponse) => {
          console.log("error:: " + err.message);
      }
    );
  }

  // Convert HTML encoding to html
  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  // Pagination page change.
  pageChanged(e: PageChangedEvent): void {
    //debugger;

    this.page = e.page;
    var obj = {
      intitle: this.searchText
    }
    this.searchSubmitFn(obj, e.page, e.itemsPerPage);
  }

  // showAnswerFn(accepted_answer_id, question_id, link): any {
  //   let newLink = link.replace(question_id, accepted_answer_id); 
  //   //console.log(newLink);
  //   window.open(newLink, '_blank');
  // }

  // trackByStackListFn(index: number, subinventoryList): string {
  //   return subinventoryList.inventoryId;
  // }
}
