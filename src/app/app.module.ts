import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { StackExchangeService } from './service/stack-exchange.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot()
  ],
  providers: [StackExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
