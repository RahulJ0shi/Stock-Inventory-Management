import { Component, OnInit } from '@angular/core';
import {ProductsService} from 'src/app/products.service'
import { getLocaleDateFormat } from '@angular/common';
import { Dictionary } from 'highcharts';


@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  constructor(private productService:ProductsService) { }
  products:any
  categories:any
  report=[]
  totalPrice=0
  totalUnits=0  

  ngOnInit() {
    this.getData()
  }

  async getData(){
    this.products=await this.productService.AllProducts().toPromise()
    this.categories=await this.productService.Categories().toPromise()
    var srno=0
    this.categories.forEach(cat => {
      var count=0
      var price=0
      srno+=1
      this.products.forEach(prod=>{
        if(prod['category']==cat['p_category']){
          count+=Number(prod['units'])
          price+=prod['price']
        }
      })
      this.totalUnits+=count
      this.totalPrice+=price
      var data={'srno':srno,'category':cat['p_category'],'count':count,'price':price}
      this.report.push(data)
    });
  }

}
