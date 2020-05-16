import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { GraphsComponent } from './home/graphs/graphs.component';
import { HighchartsChartComponent } from 'highcharts-angular';
import { TopProductsComponent } from './home/top-products/top-products.component';
import { SearchFilterPipe } from './search-filter.pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GraphsComponent,
    HighchartsChartComponent,
    TopProductsComponent,
    routingComponents,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
