import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/products.service'

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent implements OnInit {

  public topProducts:any

  constructor(private productService:ProductsService) { }

  ngOnInit() {
    this.getdata()
  }

  getdata(){
    this.productService.TopProducts()
    .subscribe(data=>{this.topProducts=data})
  }
}
